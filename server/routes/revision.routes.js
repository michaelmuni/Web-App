const revisionController = require("../controllers/revision.controller");
const express = require("express");
const router = express.Router();

router.get("/", revisionController.countAll);
router.get("/countTitle", revisionController.countTitle)
router.get("/uniqueTitles", revisionController.getUniqueTitles)
router.get("/latestRevision", revisionController.getLatestRevision)
router.get("/oldestRevision", revisionController.getOldestRevision)
router.get("/getHighestRevisions", revisionController.getHighestRevisions)
router.get("/getLowestRevisions", revisionController.getLowestRevisions)
router.get("/getHighestRevisionsWithValue", revisionController.getHighestRevisionsWithValue)
router.get("/getLowestRevisionsWithValue", revisionController.getLowestRevisionsWithValue)


module.exports = router;