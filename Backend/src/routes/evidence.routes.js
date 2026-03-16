const express = require("express");
const router = express.Router();

const evidenceController = require("../controllers/evidence.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post(
  "/evidences",
  auth,
  upload.single("file"),
  evidenceController.uploadEvidence
);

router.get(
  "/evidences/:taskId",
  auth,
  evidenceController.getTaskEvidences
);

module.exports = router;
