const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, is_admin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
