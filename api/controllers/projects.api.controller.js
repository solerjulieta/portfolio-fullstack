import * as projectsService from '../../services/projects.service.js'

async function getAll(req, res)
{
    projectsService.getAll()
        .then(function(projects){
            res.status(200).json(projects)
        })
}

async function getTotal(req, res)
{
    projectsService.getTotal()
        .then(function(totals){
            res.status(200).json(totals)
        })
}

async function getByUid(req, res)
{
    const uid = req.params.uid

    projectsService.getByUid(uid)
        .then(function(project){
            if(project){
                res.status(200).json(project)
            } else {
                res.status(400).json({ error: { msg: err.message } })
            }
        })
        .catch(function(err){
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function create(req, res)
{
    let project = { ...req.body }

    // Parsear campos que vienen como JSON string
    if (project.description) {
        project.description = JSON.parse(project.description)
    }

    // Normalizar tech
    if (project.tech) {
        if (typeof project.tech === 'string') {
            project.tech = JSON.parse(project.tech)
        }
    } else {
        project.tech = []
    }

    // Imagen procesada por multer + sharp
    if (req.processImage) {
        project.img = req.processImage
    }

    projectsService.create(project)
        .then(() => {
            res.status(201).json({ msg: 'Proyecto creado con éxito.' })
        })
        .catch(function(err){
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function edit(req, res)
{
    const { id } = req.params
    let project = { ...req.body }

    // Parsear campos que vienen como JSON string
    if (project.description) {
        project.description = JSON.parse(project.description)
    }

    // Normalizar tech
    if(project.tech !== undefined){
        if(typeof project.tech === "string"){
            project.tech = JSON.parse(project.tech)
        }
    }

    // Imagen procesada por multer + sharp
    if (req.processImage) {
        project.img = req.processImage
    }

    projectsService.edit(id, project)
        .then(() => {
            res.status(200).json({ msg: 'Proyecto editado con éxito.' })
        })
        .catch(function(err){
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function deleteImg(req, res)
{
    const { id } = req.params

    projectsService.deleteImg(id)
        .then(() => {
            res.status(200).json({ msg: 'Imagen eliminada con éxito.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

async function archive(req, res)
{
    const { id } = req.params

    projectsService.archive(id)
        .then(() => {
            res.status(200).json({ msg: 'El proyecto ha sido archivado.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

async function restore(req, res)
{
    const { id } = req.params

    projectsService.restore(id)
        .then(() => {
            res.status(200).json({ msg: 'El proyecto ha sido restaurado.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

async function deleteProject(req, res)
{
    const { id } = req.params

    projectsService.deleteProject(id)
        .then(() => {
            res.status(200).json({ msg: 'El proyecto ha sido eliminado.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

export{
    getAll,
    getByUid,
    create,
    edit,
    deleteImg,
    archive,
    restore,
    deleteProject,
    getTotal
}