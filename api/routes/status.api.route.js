import { Router } from 'express'
import * as statusController from '../controllers/status.api.controller.js'

const router = Router()

router.route('/api/status')
    .get(statusController.getAll)

export default router