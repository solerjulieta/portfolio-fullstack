import * as skillsService from '../../services/skills.service.js'

async function getAll(req, res)
{
    skillsService.getAll()
        .then(function(skills){
            res.status(200).json(skills)
        })
}

async function getByCategory(req, res)
{
    const { category } = req.params 
    skillsService.getByCategory(category)
    .then(skills => res.status(200).json(skills))
}

export{
    getAll,
    getByCategory
}