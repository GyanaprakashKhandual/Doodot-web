const { body } = require("express-validator");

exports.workValidation = [
  
  body("workName")
    .optional()
    .isString()
    .withMessage("Work name must be a string"),

  body("workDesc")
    .optional()
    .isString()
    .withMessage("Work description must be a string"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  body("workLink")
    .optional()
    .isArray()
    .withMessage("Work links must be an array"),

  body("workLink.*")
    .optional()
    .isURL()
    .withMessage("Each work link must be a valid URL"),

  body("status")
    .optional()
    .isIn(["New", "Open", "Ongoing", "Closed", "Complete", "Give Up", "Delayed"])
    .withMessage("Invalid status value"),
];
