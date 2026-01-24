import * as projectEventsService from '../../services/projectEvents.service.js'

async function registerProjectEvent(req, res)
{
    projectEventsService.registerProjectEvent(req.body)
        .then(() => {
            res.status(201).json({ ok: true })
        })
        .catch(function(err){
            res.status(500).json({ error: { msg: err.message } })
        })
}

async function getMostVisitedProject(req, res)
{
    projectEventsService.getMostVisitedProject()
        .then(item => {
            if (!item) {
                res.json({ project: null })
                return
            }

            res.json({
                project: {
                    id: item.project._id,
                    title: item.project.title,
                    visits: item.visits,
                    category: item.category
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: { msg: err.message } })
        })
}

async function getTopVisitedProjects(req, res)
{
    projectEventsService.getTopVisitedProjects(3)
    .then(items => {
        res.json({
            projects: items.map(item => ({
                id: item.project._id,
                title: item.project.title,
                visits: item.visits,
                category: item.category
            }))
        })
    })
    .catch(err => {
        res.status(500).json({ error: { msg: err.message } })
    })
}

export{
    registerProjectEvent,
    getMostVisitedProject,
    getTopVisitedProjects
}