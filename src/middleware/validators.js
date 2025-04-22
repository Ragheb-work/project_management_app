const { body, validationResult } = require("express-validator");

const validateUserRegistration = [
  body("username").notEmpty().withMessage("Username is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("password").notEmpty().withMessage("Password is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// module.exports = { validateUserRegistration, validateLogin };

const validateProject = [
  body("name").notEmpty().withMessage("Project name is required."),
  body("manager_id").isInt().withMessage("Manager ID must be an integer."),
  body("start_date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date."),
  body("end_date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("End date must be a valid date."),
  body("monitor_id").isInt().withMessage("Monitor ID must be an integer."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateTask = [
  body("project_id").isInt().withMessage("Project ID must be an integer."),
  body("description").notEmpty().withMessage("Task description is required."),
  body("executor_id").isInt().withMessage("Executor ID must be an integer."),
  body("start_date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date."),
  body("initial_deadline")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Initial deadline must be a valid date."),
  body("extension_deadline_1").optional().isISO8601().toDate(),
  body("extension_deadline_2").optional().isISO8601().toDate(),
  body("current_deadline").optional().isISO8601().toDate(),
  body("extension_count").optional().isInt(),
  body("status").optional().isIn(["in_progress", "completed", "overdue"]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateUserRegistration,
  validateLogin,
  validateProject,
  validateTask,
};
