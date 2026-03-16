const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/team", auth, userController.getTeam);

module.exports = router;