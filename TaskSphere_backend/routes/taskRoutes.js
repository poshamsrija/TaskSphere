const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");

router.get("/", protect, getAllTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.put("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);

module.exports = router;