import * as technologiesService from '../../services/technologies.service.js'

async function getAll(req, res)
{
    technologiesService.getAll()
        .then(function(techs){
            res.status(200).json(techs)
        })
}

export{
    getAll
}