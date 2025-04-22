const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validateProject } = require("../middleware/validators");
// Auth required for all project routes
router.post("/create", authMiddleware, validateProject, createProject);
router.get("/:id", authMiddleware, getProjectById);
router.get("/", authMiddleware, getAllProjects);
router.put("/update/:id", authMiddleware, validateProject, updateProject);
router.delete("/delete/:id", authMiddleware, deleteProject);

module.exports = router;
