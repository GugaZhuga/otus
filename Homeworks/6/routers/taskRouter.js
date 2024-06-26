const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskController.js");
taskRouter.get("/", taskController.getTasks);
taskRouter.get("/:id", taskController.getTask);
taskRouter.post("/", taskController.addTask);
taskRouter.delete("/:id", taskController.removeTask);
taskRouter.put("/:id", taskController.editTask);
taskRouter.patch("/:id", taskController.editTask);
taskRouter.put("/:id/users/:id", taskController.editTaskUser);
module.exports = taskRouter;