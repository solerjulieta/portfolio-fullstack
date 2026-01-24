import { Router } from 'express'
import * as technologiesController from '../controllers/technologies.api.controller.js'

const router = Router()

router.route('/api/technologies')
    .get(technologiesController.getAll)

export default router