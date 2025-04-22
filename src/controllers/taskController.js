const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      project_id,
      description,
      executor_id,
      start_date,
      initial_deadline,
    } = req.body;

    // Check if user is project manager
    const project = await Project.getById(project_id);
    if (!project || project.manager_id !== userId) {
      return res
        .status(403)
        .json({ message: "Only project manager can assign tasks." });
    }

    const task = await Task.create({
      project_id,
      description,
      executor_id,
      start_date,
      initial_deadline,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Task By ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.getById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.getById(task.project_id);
    if (task.executor_id !== userId && project.manager_id !== userId) {
      return res
        .status(403)
        .json({
          message: "Only executor or project manager can update this task.",
        });
    }

    const updatedTask = await Task.update(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.getById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.getById(task.project_id);
    if (project.manager_id !== userId) {
      return res
        .status(403)
        .json({ message: "Only project manager can delete tasks." });
    }

    await Task.delete(req.params.id);
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
