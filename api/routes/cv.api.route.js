import { Router } from "express"
import * as cvController from "../controllers/cv.api.controller.js"

const router = Router()

router.route("/api/cv/download")
  .get(cvController.downloadCV)

router.route('/api/cv/stats')
  .get(cvController.getDownloadStats)

router.route('/api/cv/totalDownloads')
  .get(cvController.getDownloadsByRoleAndLang)

export default router
