import { Router } from 'express'
import * as educationCategoriesController from '../controllers/educationCategories.api.controller.js'

const router = Router()

router.route('/education-categories')
    .get(educationCategoriesController.getAll)

export default router