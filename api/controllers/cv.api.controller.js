import path from 'path'
import * as cvService from '../../services/cv.service.js'

async function downloadCV(req, res)
{
    const { role, lang } = req.query

    if (!["dev", "design"].includes(role) || !["es", "en"].includes(lang)) {
        return res.status(400).json({ error: "Parámetros inválidos." })
    }

    await cvService.registerDownload({ role, lang })

    const fileName = `cv-solerjulieta-${role}-${lang}.pdf`
    const filePath = path.resolve(
        "public",
        "cvs",
        fileName
    )

    res.download(filePath, fileName)
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