const Project = require("../models/Project");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const manager_id = req.user.id; // From token
    const projectData = {
      ...req.body,
      manager_id,
    };

    const newProject = await Project.create(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get project by ID
exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.getById(Number(id));
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Error in getProject:", error);
    next(error);
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const existing = await Project.getById(projectId);

    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if current user is the manager
    if (existing.manager_id !== req.user.id) {
      return res.status(403).json({
        message:
          "Access denied. Only the project manager can update this project.",
      });
    }

    const updated = await Project.update(projectId, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const existing = await Project.getById(projectId);

    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if current user is the manager
    if (existing.manager_id !== req.user.id) {
      return res.status(403).json({
        message:
          "Access denied. Only the project manager can delete this project.",
      });
    }

    await Project.delete(projectId);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
};
