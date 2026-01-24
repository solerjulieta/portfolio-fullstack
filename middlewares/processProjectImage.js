import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

function slugify(text)
{
    return text 
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export default async function processProjectImage(req, res, next)
{
    if (!req.file) return next()

    try {
        const outputDir = path.join('public', 'img', 'projects')
        await fs.mkdir(outputDir, { recursive: true })

        const title = req.body.title || 'without-img'
        const slug = slugify(title)

        //Generar nombre único
        const unique = Date.now()
        const outputFilename = `${slug}-${unique}.webp`
        const outputPath = path.join(outputDir, outputFilename)

        //const outputFilename = `${slug}.webp`
        //const outputPath = path.join(outputDir, outputFilename)

        await sharp(req.file.path)
            .resize(600, 400, { fit: 'cover', position: 'center' })
            .webp({ quality: 80 })
            .toFile(outputPath)

        //Desactiva cache de sharp para evitar bloqueos
        sharp.cache(false)
        sharp.concurrency(1)

        // 🧹 Borrar archivo temporal con reintentos (Windows safe)
        const deleteTemp = async (filepath, retries = 5) => {
            while (retries > 0) {
                try {
                    await fs.rm(filepath, { force: true })
                    console.log("🧽 Temp borrado:", filepath)
                    return
                } catch (err) {
                    if (err.code === 'EBUSY' || err.code === 'EPERM') {
                        await new Promise(res => setTimeout(res, 200))
                        retries--
                    } else {
                        console.warn("⚠️ Error no controlado:", err.message)
                        return
                    }
                }
            }
            console.warn("🚫 No se pudo borrar después de varios intentos:", filepath)
        }

        await deleteTemp(req.file.path)

        // Hacer accesible el nombre final al controller
        req.processImage = outputFilename
        next()
    } catch (err) {
        next(err)
    }
}
