import express from 'express'
import BusinessesCtlr from './businesses.controller'

const router = express.Router()

router.route("/")
.get(BusinessesCtlr.apiGetBusinesses)

router.route("/id/:_id")
.get(BusinessesCtlr.apiGetBusinessById)

router.route("/category")
.get(BusinessesCtlr.apiGetBusinessCategory)

export default router