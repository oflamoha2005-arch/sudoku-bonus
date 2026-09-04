import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('Syncing dist output to repository root for GitHub Pages direct serving...');

// 1. Update asset hashes in root index.html
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  const distFiles = fs.readdirSync(path.join(distDir, 'assets'));
  const jsFile = distFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = distFiles.find(f => f.startsWith('index-') && f.endsWith('.css'));

  if (jsFile && cssFile) {
    const indexPath = path.join(rootDir, 'index.html');
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');
    indexHtml = indexHtml
      .replace(/\/sudoku-bonus\/assets\/index-.*?\.css/, `/sudoku-bonus/assets/${cssFile}`)
      .replace(/\/sudoku-bonus\/assets\/index-.*?\.js/, `/sudoku-bonus/assets/${jsFile}`);
    fs.writeFileSync(indexPath, indexHtml);
    console.log(`✓ Updated root index.html with ${jsFile} and ${cssFile}`);
  }
}

// 2. Copy assets directory
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, rootAssets, { recursive: true });
  console.log('✓ Synced assets/ to root');
}

// 3. Copy video directory
const distVideo = path.join(distDir, 'video');
const rootVideo = path.join(rootDir, 'video');
if (fs.existsSync(distVideo)) {
  fs.cpSync(distVideo, rootVideo, { recursive: true });
  const dup = path.join(rootVideo, 'video.mp4.mp4');
  if (fs.existsSync(dup)) {
    fs.unlinkSync(dup);
  }
  console.log('✓ Synced video/ to root');
}

// 4. Copy .nojekyll
const distNoJekyll = path.join(distDir, '.nojekyll');
const rootNoJekyll = path.join(rootDir, '.nojekyll');
if (fs.existsSync(distNoJekyll)) {
  fs.copyFileSync(distNoJekyll, rootNoJekyll);
  console.log('✓ Synced .nojekyll to root');
}

console.log('Sync completed successfully!');
