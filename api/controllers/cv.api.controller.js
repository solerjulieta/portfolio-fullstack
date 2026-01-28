import path from 'path'
import * as cvService from '../../services/cv.service.js'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function downloadCV(req, res)
{
    const { role, lang } = req.query

    if (!["dev", "design"].includes(role) || !["es", "en"].includes(lang)) {
        return res.status(400).json({ error: "Parámetros inválidos." })
    }

    await cvService.registerDownload({ role, lang })

    const fileName = `cv-soler-julieta-${role}-${lang}.pdf`
    const filePath = path.join(__dirname, "../../public/cvs", fileName)
    /*const filePath = path.resolve(
        "public",
        "cvs",
        fileName
    )*/

    if(!fs.existsSync(filePath)){
        console.error("CV NOT FOUND:", filePath)
        return res.status(404).json({ error: "CV no encontrado" })
    }

    return res.download(filePath, fileName)
}

async function getTotals(req, res)
{
    const stats = await cvService.getTotals()
    res.status(200).json(stats)
}

async function getDownloadStats(req, res)
{
    cvService.getDownloadStats()
        .then(function(stats){
            res.status(200).json(stats)
        })
        .catch(function(err){
            res.status(500).json({ error: { msg: err.message } })
        })  
}

async function getDownloadsByRoleAndLang(req, res)
{
    cvService.getDownloadsByRoleAndLang()
        .then(function(stats){
            res.status(200).json(stats)
        })
        .catch(function(err){
            res.status(500).json({ error: { msg: err.message } })
        })  
}

export {
    downloadCV,
    getTotals,
    getDownloadStats,
    getDownloadsByRoleAndLang
}