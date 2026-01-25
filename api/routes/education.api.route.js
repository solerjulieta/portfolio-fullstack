import { Router } from 'express'
import * as educationApiController from '../controllers/education.api.controller.js'
import { validateEducation } from '../../middlewares/education.middleware.js'

const router = Router()

router.route('/education')
    .get(educationApiController.getAll)
    .post([validateEducation], educationApiController.create)

router.route('/education/stats')
    .get(educationApiController.getTotal)

router.route('/education/:id')
    .get(educationApiController.getById)
    .patch(educationApiController.edit)
    .delete(educationApiController.deleteEducation)

router.route('/education/:id/archive')
    .patch(educationApiController.archive)

router.route('/education/:id/restore')
    .patch(educationApiController.restore)

export default router