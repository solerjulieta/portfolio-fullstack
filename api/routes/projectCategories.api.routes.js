import { Router } from 'express'
import * as projectCategoriesController from '../controllers/projectCategories.api.controller.js'

const router = Router()

router.route('/api/project-categories')
    .get(projectCategoriesController.getAll)

export default router