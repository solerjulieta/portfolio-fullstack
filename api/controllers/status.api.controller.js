import * as statusService from '../../services/status.service.js'

async function getAll(req, res)
{
    statusService.getAll()
        .then(function(status){
            res.status(200).json(status)
        })
}

export{
    getAll
}