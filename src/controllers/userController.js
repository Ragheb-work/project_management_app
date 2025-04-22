const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/auth");

// Register User (Only Admin)
exports.register = async (req, res) => {
  try {
    const { username, email, password, is_admin } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      is_admin: is_admin || false,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User by ID (Protected)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User (Protected)
exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.params.id;

    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = {
      username: username || user.username,
      email: email || user.email,
      password_hash: password
        ? await bcrypt.hash(password, 10)
        : user.password_hash,
    };

    await User.update(userId, updatedData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.delete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
