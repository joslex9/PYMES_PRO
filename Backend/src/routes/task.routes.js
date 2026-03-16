const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const taskController = require("../controllers/task.controller");

router.post("/tasks", auth, taskController.createTask);
router.get("/tasks", auth, taskController.getTasks);
router.get("/mytasks", auth, taskController.getMyTasks);
router.put("/tasks/:id/status", auth, taskController.updateStatus);
router.get("/tasks/:id", auth, taskController.getTask);

module.exports = router;
