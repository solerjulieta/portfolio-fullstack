import { Router } from 'express'
import * as contactApiController from '../controllers/contact.api.controller.js'
import { validateContact } from '../../middlewares/contact.middleware.js'

const router = Router()

router.route('/api/contact')
    .post([validateContact], contactApiController.sendEmail)

export default router