const express = require("express");
const router = express.Router();
const {
  createExtensionRequest,
  getExtensionRequestById,
  getAllForTask,
  approveOrRejectRequest,
} = require("../controllers/extensionRequestController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// Submit extension request
router.post("/", authMiddleware, createExtensionRequest);

// Get specific request
router.get("/:id", authMiddleware, getExtensionRequestById);

// Get all requests for a task
router.get("/task/:taskId", authMiddleware, getAllForTask);

// Approve/reject (admin only)
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  approveOrRejectRequest
);

module.exports = router;
