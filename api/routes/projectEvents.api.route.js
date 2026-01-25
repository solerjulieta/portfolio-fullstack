import { Router } from 'express'
import * as projectEventApiController from '../controllers/projectEvents.api.controller.js'

const router = Router()

router.route('/projects/events')
    .post(projectEventApiController.registerProjectEvent)

router.route('/projects/most-visited')
    .get(projectEventApiController.getMostVisitedProject)

router.route('/projects/top')
    .get(projectEventApiController.getTopVisitedProjects)

export default router