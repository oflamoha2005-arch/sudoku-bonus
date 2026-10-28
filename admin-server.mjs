import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, "admin-config.json");
const BOOKS_JSON_PATH = path.join(__dirname, "src", "data", "books.json");
const COVERS_DIR = path.join(__dirname, "public", "covers");
const ADMIN_DIR = path.join(__dirname, "admin");

// ---------------------------------------------------------------------------
// Security constants
// ---------------------------------------------------------------------------
const LEGACY_DEFAULT_PASSWORD = process.env.ADMIN_LEGACY_PASSWORD || "";
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const MAX_BODY_BYTES = 12 * 1024 * 1024; // JSON body (base64 image included)
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // decoded image

const ALLOWED_MARKETS = ["US", "DE", "UK", "FR", "ES", "IT", "CA", "AU", "NL", "PL", "SE", "JP", "MX", "BR"];
const AMAZON_HOST_RE =
  /^(www\.)?amazon\.(com|de|co\.uk|fr|es|it|ca|com\.au|nl|pl|se|co\.jp|com\.mx|com\.br)$/i;
const AMAZON_SHORT_HOSTS = new Set(["amzn.to", "a.co", "amzn.eu", "www.amzn.to"]);

// Ensure directories exist
fs.mkdirSync(COVERS_DIR, { recursive: true });
fs.mkdirSync(ADMIN_DIR, { recursive: true });

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Config (password is stored as a scrypt hash, never in plain text)
// ---------------------------------------------------------------------------
function writeFileAtomic(filePath, content, mode) {
  const tmp = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, content, { encoding: "utf-8", mode });
  fs.renameSync(tmp, filePath);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { passwordSalt: salt, passwordHash: hash };
}

function verifyPassword(password, cfg) {
  if (typeof password !== "string" || !cfg.passwordHash || !cfg.passwordSalt) return false;
  if (password.length > MAX_PASSWORD_LENGTH) return false;
  const actual = crypto.scryptSync(password, cfg.passwordSalt, 64);
  const expected = Buffer.from(cfg.passwordHash, "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(actual, expected);
}

let generatedFirstRunPassword = null;

function loadConfig() {
  let cfg = {};
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    }
  } catch (err) {
    console.error("Error reading admin-config.json:", err.message);
  }

  let changed = false;

  // Migrate legacy plain-text password -> hash
  if (typeof cfg.adminPassword === "string") {
    Object.assign(cfg, hashPassword(cfg.adminPassword));
    if (cfg.adminPassword === LEGACY_DEFAULT_PASSWORD) cfg.mustChangePassword = true;
    delete cfg.adminPassword;
    changed = true;
  }

  // First run: generate a random password (shown once in the console)
  if (!cfg.passwordHash) {
    generatedFirstRunPassword = crypto.randomBytes(9).toString("base64url");
    Object.assign(cfg, hashPassword(generatedFirstRunPassword));
    cfg.mustChangePassword = true;
    changed = true;
  }

  if (!cfg.port) {
    cfg.port = 3001;
    changed = true;
  }

  if (changed) saveConfig(cfg);
  return cfg;
}

function saveConfig(cfg) {
  writeFileAtomic(CONFIG_PATH, JSON.stringify(cfg, null, 2), 0o600);
}

let config = loadConfig();
const PORT = Number(config.port) || 3001;

// ---------------------------------------------------------------------------
// Books data
// ---------------------------------------------------------------------------
function getBooksData() {
  if (fs.existsSync(BOOKS_JSON_PATH)) {
    return JSON.parse(fs.readFileSync(BOOKS_JSON_PATH, "utf-8"));
  }
  return { categories: [], categoryGroups: [] };
}

function saveBooksData(data) {
  writeFileAtomic(BOOKS_JSON_PATH, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .slice(0, 60);
}

function extractAsin(input) {
  if (!input) return "";
  const trimmed = input.trim();
  if (/^[A-Z0-9]{10}$/i.test(trimmed)) return trimmed.toUpperCase();
  const match = trimmed.match(/(?:dp|gp\/product|asin)\/([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : "";
}

function optionalText(value, max, label) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") throw new HttpError(400, `${label} khass ykon texte!`);
  const trimmed = value.trim();
  if (trimmed.length > max) throw new HttpError(400, `${label} twil bzzaf (max ${max}).`);
  return trimmed;
}

function requiredText(value, max, label) {
  const text = optionalText(value, max, label);
  if (!text) throw new HttpError(400, `${label} darouri!`);
  return text;
}

function validId(value, label) {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(value)) {
    throw new HttpError(400, `${label} ghalat!`);
  }
  return value;
}

function validAsin(value) {
  const asin = optionalText(value, 10, "ASIN").toUpperCase();
  if (asin && !/^[A-Z0-9]{10}$/.test(asin)) throw new HttpError(400, "ASIN khass ykon 10 d l-7rouf/arqam!");
  return asin;
}

function validAmazonUrl(value) {
  const raw = optionalText(value, 500, "Amazon URL");
  if (!raw) return "";
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new HttpError(400, "Amazon URL ma s7i7ach!");
  }
  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || !(AMAZON_HOST_RE.test(host) || AMAZON_SHORT_HOSTS.has(host))) {
    throw new HttpError(400, "Amazon URL khass ykon https:// w mn Amazon rasmi (amazon.com, amazon.de ...).");
  }
  return url.toString();
}

function validMarket(value) {
  if (value === undefined || value === null || value === "") return "";
  const market = String(value).toUpperCase();
  if (!ALLOWED_MARKETS.includes(market)) throw new HttpError(400, "Marketplace ghalat!");
  return market;
}

function validLanguage(value) {
  if (value === undefined || value === null || value === "") return "";
  const lang = String(value).toLowerCase();
  if (!/^[a-z]{2}$/.test(lang)) throw new HttpError(400, "Langue ghalat!");
  return lang;
}

function validCoverPath(value) {
  if (!value) return "";
  if (typeof value !== "string" || !/^\/(covers|illustrations)\/[A-Za-z0-9._-]+\.(png|jpe?g|webp|gif)$/i.test(value)) {
    throw new HttpError(400, "Chemin dyal cover ghalat!");
  }
  return value;
}

function detectImageExt(buf) {
  if (buf.length > 12 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 6 && buf.toString("ascii", 0, 4) === "GIF8") return "gif";
  if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

/** Validates and stores an uploaded cover (data URL). Returns public path. */
function saveUploadedCover(dataUrl, title) {
  if (typeof dataUrl !== "string") throw new HttpError(400, "Tsswira ghalta!");
  const head = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.exec(dataUrl.slice(0, 40));
  if (!head) throw new HttpError(400, "Ghir PNG, JPG, WEBP awla GIF!");
  const buffer = Buffer.from(dataUrl.slice(head[0].length), "base64");
  if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
    throw new HttpError(400, `Tsswira khassha tkon < ${MAX_IMAGE_BYTES / 1024 / 1024}MB.`);
  }
  const ext = detectImageExt(buffer); // trust the real bytes, not the claimed type
  if (!ext) throw new HttpError(400, "Had l-fichier machi tsswira s7i7a!");
  const savedName = `${slugify(title) || "book"}-${Date.now().toString(36)}.${ext}`;
  fs.writeFileSync(path.join(COVERS_DIR, savedName), buffer);
  return `/covers/${savedName}`;
}

// ---------------------------------------------------------------------------
// Sessions & brute-force protection
// ---------------------------------------------------------------------------
const sessions = new Map(); // token -> expiresAt
const loginAttempts = new Map(); // ip -> { count, lockedUntil }

function createSession() {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + SESSION_TTL_MS);
  return token;
}

function getToken(req) {
  const header = req.headers["authorization"] || "";
  return header.replace(/^Bearer\s+/i, "");
}

function authenticate(req) {
  const token = getToken(req);
  const expires = sessions.get(token);
  if (!expires) return false;
  if (expires < Date.now()) {
    sessions.delete(token);
    return false;
  }
  return true;
}

function clientIp(req) {
  return req.socket.remoteAddress || "unknown";
}

function assertNotLocked(req) {
  const entry = loginAttempts.get(clientIp(req));
  if (entry && entry.lockedUntil > Date.now()) {
    const mins = Math.ceil((entry.lockedUntil - Date.now()) / 60000);
    throw new HttpError(429, `Bzzaf d l-m7awalat. 3awd jerreb mn b3d ${mins} d l-dqayeq.`);
  }
}

function registerFailure(req) {
  const ip = clientIp(req);
  const entry = loginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  if (entry.lockedUntil && entry.lockedUntil <= Date.now()) {
    entry.count = 0;
    entry.lockedUntil = 0;
  }
  entry.count += 1;
  if (entry.count >= MAX_LOGIN_ATTEMPTS) entry.lockedUntil = Date.now() + LOCKOUT_MS;
  loginAttempts.set(ip, entry);
}

function clearFailures(req) {
  loginAttempts.delete(clientIp(req));
}

// Periodic cleanup of expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, expires] of sessions) if (expires < now) sessions.delete(token);
}, 10 * 60 * 1000).unref();

// ---------------------------------------------------------------------------
// HTTP helpers (Host / Origin / CORS / security headers)
// ---------------------------------------------------------------------------
const ownHosts = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
const ownOrigins = new Set([`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`]);

function liveOrigin() {
  try {
    return config.liveUrl ? new URL(config.liveUrl).origin : null;
  } catch {
    return null;
  }
}

// Origins allowed to read the harmless /api/status ping (Next.js "/admin" bridge page)
function statusOrigins() {
  const set = new Set([...ownOrigins, "http://localhost:3000", "http://127.0.0.1:3000"]);
  const live = liveOrigin();
  if (live) set.add(live);
  return set;
}

function frameAncestors() {
  return ["'self'", "http://localhost:3000", "http://127.0.0.1:3000", liveOrigin()].filter(Boolean).join(" ");
}

function baseSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Cross-Origin-Resource-Policy": "same-site",
  };
}

function statusCorsHeaders(req) {
  const origin = req.headers.origin;
  if (origin && statusOrigins().has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Private-Network": "true",
    };
  }
  return {};
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.writeHead(statusCode, {
    ...baseSecurityHeaders(),
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders,
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    const type = (req.headers["content-type"] || "").toLowerCase();
    if (!type.startsWith("application/json")) {
      reject(new HttpError(415, "Content-Type khass ykon application/json"));
      return;
    }
    const chunks = [];
    let size = 0;
    let finished = false;
    req.on("data", (chunk) => {
      if (finished) return;
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        finished = true;
        reject(new HttpError(413, "Payload kbir bzzaf!"));
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (finished) return;
      finished = true;
      try {
        const raw = Buffer.concat(chunks).toString("utf-8");
        const parsed = raw ? JSON.parse(raw) : {};
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("Body must be a JSON object");
        }
        resolve(parsed);
      } catch {
        reject(new HttpError(400, "JSON ghalat!"));
      }
    });
    req.on("error", (err) => {
      if (!finished) {
        finished = true;
        reject(err);
      }
    });
  });
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

/** Serves `relative` from inside `baseDir` only (blocks path traversal). */
function serveFromDir(res, baseDir, relative) {
  let decoded;
  try {
    decoded = decodeURIComponent(relative);
  } catch {
    decoded = null;
  }
  const notFound = () => {
    res.writeHead(404, { ...baseSecurityHeaders(), "Content-Type": "text/plain" });
    res.end("404 Not Found");
  };
  if (!decoded || decoded.includes("\0")) return notFound();

  const resolved = path.resolve(baseDir, "." + path.sep + decoded.replace(/^[/\\]+/, ""));
  if (resolved !== baseDir && !resolved.startsWith(baseDir + path.sep)) return notFound();

  const ext = path.extname(resolved).toLowerCase();
  const contentType = MIME_TYPES[ext];
  if (!contentType) return notFound();

  fs.stat(resolved, (err, stats) => {
    if (err || !stats.isFile()) return notFound();
    const headers = { ...baseSecurityHeaders(), "Content-Type": contentType };
    if (ext === ".html") {
      headers["Cache-Control"] = "no-store";
      headers["Content-Security-Policy"] = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src https://fonts.gstatic.com",
        "img-src 'self' data: blob:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'self'",
        `frame-ancestors ${frameAncestors()}`,
      ].join("; ");
    }
    res.writeHead(200, headers);
    fs.createReadStream(resolved).pipe(res);
  });
}

// ---------------------------------------------------------------------------
// Git publish (no shell: arguments are passed as an array)
// ---------------------------------------------------------------------------
let publishing = false;

function git(args) {
  return new Promise((resolve) => {
    execFile("git", args, { cwd: __dirname, timeout: 120000, windowsHide: true }, (error, stdout, stderr) => {
      resolve({ error, code: error ? error.code : 0, output: `${stdout || ""}${stderr || ""}`.trim() });
    });
  });
}

async function publishToGit() {
  const commitMsg = `Admin: Update books catalog (${new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })})`;
  let log = "";

  // Never publish the admin config (it contains the password hash)
  const add = await git(["add", "-A", "--", ".", ":(exclude)admin-config.json"]);
  log += add.output + "\n";
  if (add.error) return { ok: false, error: "git add failed", output: log };

  const staged = await git(["diff", "--cached", "--quiet"]);
  if (staged.code === 1) {
    const commit = await git(["commit", "-m", commitMsg]);
    log += commit.output + "\n";
    if (commit.error) return { ok: false, error: "git commit failed", output: log };
  }

  const push = await git(["push", "origin", "main"]);
  log += push.output + "\n";
  if (push.error) return { ok: false, error: "git push failed", output: log };

  return { ok: true, clean: staged.code === 0, output: log };
}

// ---------------------------------------------------------------------------
// Request handler
// ---------------------------------------------------------------------------
async function handleApi(req, res, pathname) {
  // Public: harmless status ping (used by the Next.js /admin bridge page)
  if (pathname === "/api/status" && req.method === "GET") {
    return sendJson(res, 200, { ok: true }, statusCorsHeaders(req));
  }

  // Everything else must come from our own admin UI (same origin) or non-browser clients
  const origin = req.headers.origin;
  if (origin && !ownOrigins.has(origin)) {
    throw new HttpError(403, "Origin ma m-s7o7ach.");
  }

  if (pathname === "/api/auth/login" && req.method === "POST") {
    assertNotLocked(req);
    const body = await parseJsonBody(req);
    if (verifyPassword(body.password, config)) {
      clearFailures(req);
      const token = createSession();
      return sendJson(res, 200, {
        success: true,
        token,
        mustChangePassword: Boolean(config.mustChangePassword),
      });
    }
    registerFailure(req);
    return sendJson(res, 401, { success: false, error: "Mot de passe ghalat!" });
  }

  if (!authenticate(req)) {
    return sendJson(res, 401, { success: false, error: "Ghir m-autorisé! Dkhol b-mot de passe." });
  }

  if (pathname === "/api/auth/logout" && req.method === "POST") {
    sessions.delete(getToken(req));
    return sendJson(res, 200, { success: true });
  }

  if (pathname === "/api/auth/change-password" && req.method === "POST") {
    assertNotLocked(req);
    const body = await parseJsonBody(req);
    if (!verifyPassword(body.currentPassword, config)) {
      registerFailure(req);
      return sendJson(res, 400, { success: false, error: "L-mot de passe l-9dim ghalat!" });
    }
    clearFailures(req);
    const next = body.newPassword;
    if (typeof next !== "string" || next.length < MIN_PASSWORD_LENGTH || next.length > MAX_PASSWORD_LENGTH) {
      return sendJson(res, 400, {
        success: false,
        error: `L-mot de passe jdid khass ykon bin ${MIN_PASSWORD_LENGTH} w ${MAX_PASSWORD_LENGTH} d l-7rouf!`,
      });
    }
    if (next === LEGACY_DEFAULT_PASSWORD || next === body.currentPassword) {
      return sendJson(res, 400, { success: false, error: "Khtar mot de passe mokhtalif w 9awi!" });
    }
    config = { ...config, ...hashPassword(next) };
    delete config.mustChangePassword;
    saveConfig(config);
    // Invalidate every other session
    const current = getToken(req);
    for (const token of sessions.keys()) if (token !== current) sessions.delete(token);
    return sendJson(res, 200, { success: true, message: "L-mot de passe t-beddel b-naja7!" });
  }

  if (pathname === "/api/books" && req.method === "GET") {
    return sendJson(res, 200, getBooksData());
  }

  if (pathname === "/api/books/add" && req.method === "POST") {
    const body = await parseJsonBody(req);
    const title = requiredText(body.title, 200, "Title");
    const categoryId = validId(body.categoryId, "Category");
    const description = optionalText(body.description, 2000, "Description");
    const badge = optionalText(body.badge, 40, "Badge");
    const asinInput = validAsin(body.asin);
    const amazonUrl = validAmazonUrl(body.amazonUrl);
    const language = validLanguage(body.language);
    const defaultMarket = validMarket(body.defaultMarket);

    const booksData = getBooksData();
    const targetCategory = booksData.categories.find((c) => c.id === categoryId);
    if (!targetCategory) {
      return sendJson(res, 404, { success: false, error: "Category ma l9inahaash!" });
    }

    let coverPath = validCoverPath(body.coverUrl) || "/covers/winter-word-search.jpg";
    if (body.coverImageBase64) {
      coverPath = saveUploadedCover(body.coverImageBase64, title);
    } else if (body.coverFilename) {
      coverPath = `/covers/${path.basename(String(body.coverFilename))}`;
      validCoverPath(coverPath);
    }

    const computedAsin = asinInput || extractAsin(amazonUrl);
    let finalAmazonUrl = amazonUrl;
    if (!finalAmazonUrl && computedAsin) {
      const domain = defaultMarket === "DE" ? "amazon.de" : defaultMarket === "UK" ? "amazon.co.uk" : "amazon.com";
      finalAmazonUrl = `https://www.${domain}/dp/${computedAsin}`;
    }

    const newBook = {
      id: `${slugify(title) || "book"}-${Date.now().toString(36).slice(-4)}`,
      title,
      cover: coverPath,
      asin: computedAsin || undefined,
      amazonUrl: finalAmazonUrl || "https://www.amazon.com",
      language: language || "en",
      defaultMarket: defaultMarket || "US",
      badge: badge || undefined,
      description,
    };

    if (!targetCategory.books) targetCategory.books = [];
    targetCategory.books.push(newBook);
    saveBooksData(booksData);
    return sendJson(res, 200, { success: true, book: newBook });
  }

  if (pathname === "/api/books/update" && req.method === "POST") {
    const body = await parseJsonBody(req);
    const id = validId(body.id, "ID");
    const title = requiredText(body.title, 200, "Title");
    const categoryId = validId(body.categoryId, "Category");
    const originalCategoryId = body.originalCategoryId ? validId(body.originalCategoryId, "Category") : "";
    const badge = optionalText(body.badge, 40, "Badge");
    const asinInput = validAsin(body.asin);
    const amazonUrl = validAmazonUrl(body.amazonUrl);
    const language = validLanguage(body.language);
    const defaultMarket = validMarket(body.defaultMarket);
    const description = body.description === undefined ? undefined : optionalText(body.description, 2000, "Description");

    const booksData = getBooksData();
    let currentCategory = booksData.categories.find((c) => c.id === (originalCategoryId || categoryId));
    let bookIndex = currentCategory ? (currentCategory.books || []).findIndex((b) => b.id === id) : -1;

    if (bookIndex === -1) {
      for (const cat of booksData.categories) {
        const idx = (cat.books || []).findIndex((b) => b.id === id);
        if (idx !== -1) {
          currentCategory = cat;
          bookIndex = idx;
          break;
        }
      }
    }
    if (bookIndex === -1 || !currentCategory) {
      return sendJson(res, 404, { success: false, error: "L-ktab ma l9inahaash!" });
    }

    const existingBook = currentCategory.books[bookIndex];

    let coverPath = existingBook.cover;
    if (body.coverImageBase64) {
      coverPath = saveUploadedCover(body.coverImageBase64, title);
    } else if (body.coverUrl) {
      coverPath = validCoverPath(body.coverUrl);
    } else if (body.coverFilename) {
      coverPath = `/covers/${path.basename(String(body.coverFilename))}`;
      validCoverPath(coverPath);
    }

    const computedAsin = asinInput || extractAsin(amazonUrl);
    let finalAmazonUrl = amazonUrl || existingBook.amazonUrl;
    if (!finalAmazonUrl && computedAsin) {
      const domain = defaultMarket === "DE" ? "amazon.de" : defaultMarket === "UK" ? "amazon.co.uk" : "amazon.com";
      finalAmazonUrl = `https://www.${domain}/dp/${computedAsin}`;
    }

    const updatedBook = {
      ...existingBook,
      title,
      cover: coverPath,
      asin: computedAsin || undefined,
      amazonUrl: finalAmazonUrl || "https://www.amazon.com",
      language: language || existingBook.language || "en",
      defaultMarket: defaultMarket || existingBook.defaultMarket || "US",
      badge: badge || undefined,
      description: description !== undefined ? description : existingBook.description,
    };

    if (currentCategory.id !== categoryId) {
      const newCategory = booksData.categories.find((c) => c.id === categoryId);
      if (!newCategory) {
        return sendJson(res, 404, { success: false, error: "Category ma l9inahaash!" });
      }
      currentCategory.books.splice(bookIndex, 1);
      if (!newCategory.books) newCategory.books = [];
      newCategory.books.push(updatedBook);
    } else {
      currentCategory.books[bookIndex] = updatedBook;
    }

    saveBooksData(booksData);
    return sendJson(res, 200, { success: true, book: updatedBook });
  }

  if (pathname === "/api/books/delete" && req.method === "POST") {
    const body = await parseJsonBody(req);
    const id = validId(body.id, "ID");
    const categoryId = body.categoryId ? validId(body.categoryId, "Category") : "";

    const booksData = getBooksData();
    let deleted = false;
    for (const cat of booksData.categories) {
      if (categoryId && cat.id !== categoryId) continue;
      const idx = (cat.books || []).findIndex((b) => b.id === id);
      if (idx !== -1) {
        cat.books.splice(idx, 1);
        deleted = true;
        break;
      }
    }
    if (!deleted) {
      return sendJson(res, 404, { success: false, error: "L-ktab ma l9inahaash bach nms7ooh!" });
    }
    saveBooksData(booksData);
    return sendJson(res, 200, { success: true, message: "L-ktab t-mse7 b-naja7!" });
  }

  if (pathname === "/api/git/publish" && req.method === "POST") {
    if (publishing) {
      return sendJson(res, 409, { success: false, error: "Publish kayn deja khddam, tsna chwiya." });
    }
    publishing = true;
    try {
      const result = await publishToGit();
      if (!result.ok) {
        return sendJson(res, 500, { success: false, error: result.error, output: result.output });
      }
      return sendJson(res, 200, {
        success: true,
        clean: result.clean,
        output: result.output,
        message: result.clean
          ? "Site deja a jour! Kolchi m-sauvegarder w pushé f GitHub."
          : "Pushé l GitHub b-naja7! GitHub Pages kay-deployi l-site deba (~1 min).",
      });
    } finally {
      publishing = false;
    }
  }

  return sendJson(res, 404, { error: "API route not found" });
}

const server = http.createServer(async (req, res) => {
  try {
    // Block DNS-rebinding: only accept our own local host names
    const host = (req.headers.host || "").toLowerCase();
    if (!ownHosts.has(host)) {
      res.writeHead(403, { ...baseSecurityHeaders(), "Content-Type": "text/plain" });
      res.end("Forbidden host");
      return;
    }

    let pathname;
    try {
      pathname = new URL(req.url, `http://${host}`).pathname;
    } catch {
      throw new HttpError(400, "Bad request");
    }

    // CORS preflight: only for /api/status from known origins
    if (req.method === "OPTIONS") {
      const cors = pathname === "/api/status" ? statusCorsHeaders(req) : {};
      res.writeHead(Object.keys(cors).length ? 204 : 403, { ...baseSecurityHeaders(), ...cors });
      res.end();
      return;
    }

    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, pathname);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      throw new HttpError(405, "Method not allowed");
    }

    // Uploaded covers
    if (pathname.startsWith("/covers/")) {
      serveFromDir(res, COVERS_DIR, path.basename(pathname));
      return;
    }

    // Admin UI
    let requested = pathname === "/" ? "/index.html" : pathname.replace(/^\/admin(?=\/|$)/, "") || "/index.html";
    if (requested === "/") requested = "/index.html";
    if (!path.extname(requested)) requested = "/index.html";
    serveFromDir(res, ADMIN_DIR, requested);
  } catch (err) {
    if (res.headersSent) {
      res.end();
      return;
    }
    if (err instanceof HttpError) {
      sendJson(res, err.status, { success: false, error: err.message });
    } else {
      console.error("API error:", err);
      sendJson(res, 500, { success: false, error: "Server error" });
    }
  }
});

server.requestTimeout = 30000;
server.headersTimeout = 10000;

// Listen on loopback only: the admin must never be reachable from the network
server.listen(PORT, "127.0.0.1", () => {
  console.log(`====================================================`);
  console.log(`  Oufella Activity Books - Admin Server`);
  console.log(`  Running at: http://localhost:${PORT}  (local only)`);
  if (generatedFirstRunPassword) {
    console.log(`  Temporary password (shown ONCE): ${generatedFirstRunPassword}`);
    console.log(`  Beddlo mn Settings 9bel ma t-publier.`);
  } else if (config.mustChangePassword) {
    console.log(`  WARNING: Mot de passe d-default mazal mkhdam: beddlo mn Settings!`);
  }
  console.log(`====================================================`);
});
