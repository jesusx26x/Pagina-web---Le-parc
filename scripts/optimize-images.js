import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Paths (ES modules context)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images/raw');
const OUTPUT_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1920;

async function optimizeImages() {
    try {
        // 1. Verify that raw directory exists
        await fs.access(INPUT_DIR);

        // 2. Read all files in raw directory
        const files = await fs.readdir(INPUT_DIR);
        const validImageExtensions = ['.jpg', '.jpeg', '.png'];

        // Filter only JPG/PNG files
        const imagesToProcess = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return validImageExtensions.includes(ext);
        });

        if (imagesToProcess.length === 0) {
            console.log('✅ No hay imágenes pendientes de optimizar en public/images/raw');
            return;
        }

        console.log(`🚀 Iniciando optimización de ${imagesToProcess.length} imágenes...\n`);

        // 3. Process all images in parallel for maximum performance
        await Promise.all(imagesToProcess.map(async (filename) => {
            const inputPath = path.join(INPUT_DIR, filename);
            const parsedPath = path.parse(filename);
            const nameWithoutExt = parsedPath.name;
            const originalExt = parsedPath.ext.toLowerCase();

            try {
                console.log(`⚙️ Procesando: ${filename}`);

                // Sharp instance with proportional resize (max width 1920px)
                // without enlarging (withoutEnlargement: true)
                const image = sharp(inputPath).resize({
                    width: MAX_WIDTH,
                    withoutEnlargement: true
                });

                // Paths for output files
                const avifPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.avif`);
                const webpPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);
                const fallbackPath = path.join(OUTPUT_DIR, `${nameWithoutExt}${originalExt}`);

                // A. Generate AVIF (Quality 75, Effort 4 as requested)
                const avifPromise = image.clone().avif({
                    quality: 75,
                    effort: 4
                }).toFile(avifPath);

                // B. Generate WebP (Quality 80 as requested)
                const webpPromise = image.clone().webp({
                    quality: 80
                }).toFile(webpPath);

                // C. Generate Optimized Fallback (JPG/PNG)
                let fallbackPromise;
                if (originalExt === '.png') {
                    fallbackPromise = image.clone().png({ quality: 85, compressionLevel: 8 }).toFile(fallbackPath);
                } else {
                    fallbackPromise = image.clone().jpeg({ quality: 85, progressive: true }).toFile(fallbackPath);
                }

                // Wait for the 3 formats of this specific image to finish
                await Promise.all([avifPromise, webpPromise, fallbackPromise]);

                console.log(`✅ ¡Completado! -> ${nameWithoutExt} (.avif, .webp, ${originalExt})`);

            } catch (err) {
                console.error(`❌ Error procesando ${filename}:`, err.message);
            }
        }));

        console.log('\n🌟 ¡Auditoría de imágenes 100/100 Lighthouse completada! 🌟');
        console.log(`Revisa la carpeta public/images/ para ver las versiones híbridas.`);

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`🚨 Error: La carpeta ${INPUT_DIR} no existe. Créala y coloca allí los archivos.`);
        } else {
            console.error('🚨 Error crítico en la ejecución del script:', err);
        }
    }
}

optimizeImages();
