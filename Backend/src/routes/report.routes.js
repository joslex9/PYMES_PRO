const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report.controller");
const auth = require("../middleware/auth.middleware");

router.get(
"/reports/tasks",
auth,
reportController.exportTasksReport
);

module.exports = router;