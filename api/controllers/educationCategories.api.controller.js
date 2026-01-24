import * as educationCategoriesService from '../../services/educationCategories.service.js'

async function getAll(req, res)
{
    educationCategoriesService.getAll()
        .then(function(categories){
            res.status(200).json(categories)
        })
}

export{
    getAll
}