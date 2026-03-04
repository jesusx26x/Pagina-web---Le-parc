import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'https://leparc.do';

const urls = [
    { path: '/', priority: '1.0' },
    { path: '/#nosotros', priority: '0.8' },
    { path: '/#experiencias', priority: '0.9' },
    { path: '/#planes', priority: '0.9' },
    { path: '/#galeria', priority: '0.8' }
];

function generateSitemap() {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.path}</loc>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

    return sitemapContent;
}

function generateRobotsText() {
    return `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

function run() {
    if (!fs.existsSync(DIST_DIR)) {
        console.error('❌ Error: La carpeta "dist" no existe. Asegúrate de ejecutar el build primero.');
        return;
    }

    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    const robotsPath = path.join(DIST_DIR, 'robots.txt');

    try {
        fs.writeFileSync(sitemapPath, generateSitemap(), 'utf8');
        fs.writeFileSync(robotsPath, generateRobotsText(), 'utf8');

        console.log('✅ ¡Sitemap y robots.txt generados con éxito en /dist!');
    } catch (err) {
        console.error('❌ Error guardando los archivos:', err);
    }
}

run();
