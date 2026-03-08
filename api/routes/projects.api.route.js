import { Router } from 'express'
import * as projectsApiController from '../controllers/projects.api.controller.js'
import uploadProjectImage from '../../middlewares/uploadProjectImage.middleware.js'
import processProjectImage from '../../middlewares/processProjectImage.js'

const router = Router()

router.route('/projects')
    .get(projectsApiController.getAll)
    .post([uploadProjectImage.single('img'), processProjectImage], projectsApiController.create)

router.route('/projects/stats')
    .get(projectsApiController.getTotal)

router.route('/project/:uid')
    .get(projectsApiController.getByUid)
    .patch([uploadProjectImage.single('img'), processProjectImage], projectsApiController.edit)
    .delete(projectsApiController.deleteProject)

router.route('/project/:id/image')
    .delete(projectsApiController.deleteImg)

router.route('/project/:id/archive')
    .patch(projectsApiController.archive)

router.route('/project/:id/restore')
    .patch(projectsApiController.restore)

export default router