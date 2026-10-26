"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, RefreshCw, ExternalLink } from "lucide-react";

// The admin bridge talks to a local-only server (localhost:3001).
// It must never be reachable/advertised on the public production site.
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export default function AdminBridgePage() {
  if (IS_PRODUCTION) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-3">Page not available</h1>
          <Link href="/" className="text-purple-700 font-semibold hover:underline">
            ← Back to Site
          </Link>
        </div>
      </div>
    );
  }
  return <AdminBridge />;
}

function AdminBridge() {
  const [isServerRunning, setIsServerRunning] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const runCheck = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/status", {
        method: "GET",
        mode: "cors",
      });
      setIsServerRunning(res.ok);
    } catch {
      setIsServerRunning(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const checkAdminServer = () => {
    setIsChecking(true);
    runCheck();
  };

  useEffect(() => {
    // Intentional: one-time status ping on mount (state is set after the await)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runCheck();
  }, [runCheck]);

  if (isServerRunning) {
    return (
      <div className="pt-20 min-h-screen bg-slate-900 flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-white">
              Admin Engine Connected (Port 3001)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
            >
              Open in Separate Tab <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>

        <iframe
          src="http://localhost:3001"
          className="w-full flex-1 border-0 min-h-[calc(100vh-130px)]"
          title="Oufella Admin Dashboard"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-gradient-to-br from-[#FFF5E6] via-[#FFEEF0] to-[#EDE7FF]">
      <div className="max-w-lg w-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-purple-100 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF8FAB] to-[#8B5CF6] flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-pink-200">
          <BookOpen className="w-8 h-8" />
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Oufella Admin Portal
        </h1>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Bach t-dkhel l had l-interface w t-zid l-kotob jdad, khassek t-demari
          l-Admin Server mn l-PC dyalek.
        </p>

        {/* Step by step card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <p className="text-xs text-slate-700">
              7ell l-folder dyalek f Desktop: <br />
              <code className="text-purple-700 font-mono text-[11px] bg-purple-50 px-1 py-0.5 rounded">
                web site / Admin.bat
              </code>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <p className="text-xs text-slate-700">
              Double-cliki 3la fichier <strong>Admin.bat</strong> (ghadi yt7ell
              l-browser direct).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <p className="text-xs text-slate-700">
              Dkhel l-mot de passe dyal l-Admin dyalek bach t-connecta.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={checkAdminServer}
            disabled={isChecking}
            className="flex-1 py-3.5 px-5 bg-gradient-to-r from-[#FF8FAB] to-[#8B5CF6] text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <RefreshCw
              className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`}
            />
            {isChecking ? "Kay-vérifier..." : "Vérifier Connexion"}
          </button>

          <Link
            href="/"
            className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-sm transition-colors text-center"
          >
            ← Reje3 l-Site
          </Link>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>🔒 Espace réservé à l-Admin</span>
        </div>
      </div>
    </div>
  );
}
