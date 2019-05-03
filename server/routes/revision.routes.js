const revisionController = require("../controllers/revision.controller");
const express = require("express");
const router = express.Router();

router.get("/", revisionController.countAll);
router.get("/countTitle", revisionController.countTitle)
router.get("/uniqueTitles", revisionController.getUniqueTitles)
module.exports = router;