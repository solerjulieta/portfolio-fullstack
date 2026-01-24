import { Router } from 'express'
import * as adminApiController from '../controllers/admin.api.controller.js'
import { validateLogin, validateUser, validateRecoveryPassword } from '../../middlewares/account.middleware.js'
import { isLogin } from '../../middlewares/auth.middleware.js'
import * as cvApiController from '../controllers/cv.api.controller.js'

const router = Router()

router.route('/api/admin')
    .post(adminApiController.register)

/**
 * Login & Logout
 */
router.route('/api/admin/login')
    .post([validateLogin], adminApiController.login)

router.route('/api/admin/logout')
    .delete(adminApiController.logout)

router.route('/api/admin/forgotPassword')
    .post([validateUser], adminApiController.forgotPassword)

router.route('/api/admin/forgotPassword/:token')
    .post([validateRecoveryPassword], adminApiController.recoveryPassword)

// Nueva ruta para chequear si está logueado
router.route('/api/admin/check')
    .get(isLogin, (req, res) => {
        res.status(200).json({ logged: true, account: req.account })
    })

router.route('/api/admin/cv')
    .get([isLogin], cvApiController.getTotals)

export default router