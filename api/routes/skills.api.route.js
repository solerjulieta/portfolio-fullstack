import { Router } from 'express'
import * as skillApiController from '../controllers/skills.api.controller.js'

const router = Router()

router.route('/skills')
    .get(skillApiController.getAll)

router.route('/skills/:category')
    .get(skillApiController.getByCategory)
    
export default router