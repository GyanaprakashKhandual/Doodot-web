const { body, param } = require("express-validator");

exports.validateWork = [
  body("user")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID"),

  body("projectName")
    .notEmpty().withMessage("Project name is required")
    .isString().withMessage("Project name must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("Project name must be between 3 and 100 characters"),

  body("projectDesc")
    .optional()
    .isString().withMessage("Project description must be a string")
    .isLength({ max: 300 }).withMessage("Project description must not exceed 300 characters")
];
