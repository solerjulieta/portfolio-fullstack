import { Router } from 'express'
import * as projectEventApiController from '../controllers/projectEvents.api.controller.js'

const router = Router()

router.route('/api/projects/events')
    .post(projectEventApiController.registerProjectEvent)

router.route('/api/projects/most-visited')
    .get(projectEventApiController.getMostVisitedProject)

router.route('/api/projects/top')
    .get(projectEventApiController.getTopVisitedProjects)

export default router