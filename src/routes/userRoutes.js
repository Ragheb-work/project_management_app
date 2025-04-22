const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const { loginLimiter } = require("../middleware/rateLimiter");
const {
  validateUserRegistration,
  validateLogin,
} = require("../middleware/validators");

// Public Routes
router.post(
  "/register",
  authMiddleware,
  adminMiddleware,
  validateUserRegistration,
  register
); // Only admin can create users
router.post("/login", loginLimiter, validateLogin, login); // problem in validate login and validateUserRegistration

// Protected Routes
router.get("/:id", authMiddleware, getUserById);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser); // Only admin

module.exports = router;
