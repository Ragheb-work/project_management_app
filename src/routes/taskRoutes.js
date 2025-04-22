const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { validateTask } = require("../middleware/validators");

// Create a task (only project manager can assign tasks)
router.post("/create", authMiddleware, validateTask, createTask);

// Get all tasks (authenticated users only)
router.get("/", authMiddleware, getAllTasks);

// Get single task
router.get("/:id", authMiddleware, getTaskById);

// Update task (only task executor or project manager can update)
router.put("/update/:id", authMiddleware, validateTask, updateTask);

// Delete task (only project manager can delete)
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
