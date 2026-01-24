import { Router } from 'express'
import * as projectsApiController from '../controllers/projects.api.controller.js'
import uploadProjectImage from '../../middlewares/uploadProjectImage.middleware.js'
import processProjectImage from '../../middlewares/processProjectImage.js'

const router = Router()

router.route('/api/projects')
    .get(projectsApiController.getAll)
    .post([uploadProjectImage.single('img'), processProjectImage], projectsApiController.create)

router.route('/api/projects/stats')
    .get(projectsApiController.getTotal)

router.route('/api/project/:id')
    .get(projectsApiController.getById)
    .patch([uploadProjectImage.single('img'), processProjectImage], projectsApiController.edit)
    .delete(projectsApiController.deleteProject)

router.route('/api/project/:id/image')
    .delete(projectsApiController.deleteImg)

router.route('/api/project/:id/archive')
    .patch(projectsApiController.archive)

router.route('/api/project/:id/restore')
    .patch(projectsApiController.restore)

export default router