import * as projectCategoriesService from '../../services/projectCategories.service.js'

async function getAll(req, res)
{
    projectCategoriesService.getAll()
        .then(function(categories){
            res.status(200).json(categories)
        })
}

export{
    getAll
}