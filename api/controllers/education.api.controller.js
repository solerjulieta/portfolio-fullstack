import * as educationService from '../../services/education.service.js'

async function getAll(req, res)
{
    educationService.getAll()
        .then(function(studies){
            res.status(200).json(studies)
        })
}

async function getTotal(req, res)
{
    educationService.getTotal()
        .then(function(totalStudies){
            res.status(200).json(totalStudies)
        })
}

async function getById(req, res)
{
    const id = req.params.id

    educationService.getById(id)
        .then(function(studie){
            if(studie){
                res.status(200).json(studie)
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
    const formation = { ...req.body }

    educationService.create(formation)
        .then(() => {
            res.status(201).json({ msg: 'Formación creada con éxito.' })
        })
        .catch(function(err){
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function edit(req, res)
{
    const { id } = req.params
    const formation = req.body

    educationService.edit(id, formation)
        .then(() => {
            res.status(200).json({ msg: 'Formación editada con éxito.' })
        })
        .catch(function(err){
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function archive(req, res)
{
    const { id } = req.params

    educationService.archive(id)
        .then(() => {
            res.status(200).json({ msg: 'La formación ha sido archivada.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

async function restore(req, res)
{
    const { id } = req.params

    educationService.restore(id)
        .then(() => {
            res.status(200).json({ msg: 'La formación ha sido restaurada.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

async function deleteEducation(req, res)
{
    const { id } = req.params

    educationService.deleteEducation(id)
        .then(() => {
            res.status(200).json({ msg: 'La formación ha sido eliminada.' })
        })
        .catch(function(error){
            res.status(400).json({ error: error.message })
        })
}

export{
    getAll,
    getTotal,
    getById,
    create,
    edit,
    archive,
    restore,
    deleteEducation
}