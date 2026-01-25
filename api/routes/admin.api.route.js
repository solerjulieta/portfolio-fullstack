import { Router } from 'express'
import * as adminApiController from '../controllers/admin.api.controller.js'
import { validateLogin, validateUser, validateRecoveryPassword } from '../../middlewares/account.middleware.js'
import { isLogin } from '../../middlewares/auth.middleware.js'
import * as cvApiController from '../controllers/cv.api.controller.js'

const router = Router()

router.route('/admin')
    .post(adminApiController.register)

/**
 * Login & Logout
 */
router.route('/admin/login')
    .post([validateLogin], adminApiController.login)

router.route('/admin/logout')
    .delete(adminApiController.logout)

router.route('/admin/forgotPassword')
    .post([validateUser], adminApiController.forgotPassword)

router.route('/admin/forgotPassword/:token')
    .post([validateRecoveryPassword], adminApiController.recoveryPassword)

// Nueva ruta para chequear si está logueado
router.route('/admin/check')
    .get(isLogin, (req, res) => {
        res.status(200).json({ logged: true, account: req.account })
    })

router.route('/admin/cv')
    .get([isLogin], cvApiController.getTotals)

export default router