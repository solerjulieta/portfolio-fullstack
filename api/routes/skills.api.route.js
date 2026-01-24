import { Router } from 'express'
import * as skillApiController from '../controllers/skills.api.controller.js'

const router = Router()

router.route('/api/skills')
    .get(skillApiController.getAll)

router.route('/api/skills/:category')
    .get(skillApiController.getByCategory)
    
export default router