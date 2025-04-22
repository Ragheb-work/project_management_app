const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error); // ✅ Log any verification errors
    res.status(403).json({ message: "Invalid token." });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || (req.user.is_admin !== true && req.user.is_admin !== 1)) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
