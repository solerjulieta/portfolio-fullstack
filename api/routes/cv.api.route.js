import { Router } from "express"
import * as cvController from "../controllers/cv.api.controller.js"

const router = Router()

router.route("/cv/download")
  .get(cvController.downloadCV)

router.route('/cv/stats')
  .get(cvController.getDownloadStats)

router.route('/cv/totalDownloads')
  .get(cvController.getDownloadsByRoleAndLang)

export default router
