const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const auth = require("../middleware/auth.middleware");

router.get(
  "/dashboard",
  auth,
  dashboardController.getDashboardStats
);

router.get(
 "/employee/dashboard",
 auth,
 dashboardController.getEmployeeDashboard
);

module.exports = router;
