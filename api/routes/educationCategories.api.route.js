import { Router } from 'express'
import * as educationCategoriesController from '../controllers/educationCategories.api.controller.js'

const router = Router()

router.route('/api/education-categories')
    .get(educationCategoriesController.getAll)

export default router