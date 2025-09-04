const { body } = require("express-validator");

exports.subWorkValidation = [
  
  body("subWorkName")
    .optional()
    .isString()
    .withMessage("Sub-work name must be a string")
    .isLength({ min: 2 })
    .withMessage("Sub-work name must be at least 2 characters long"),

  body("subWorkDesc")
    .optional()
    .isString()
    .withMessage("Sub-work description must be a string")
    .isLength({ min: 5 })
    .withMessage("Sub-work description must be at least 5 characters long"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  body("subWorkLink")
    .optional()
    .isArray()
    .withMessage("Sub-work links must be an array"),

  body("subWorkLink.*")
    .optional()
    .isURL()
    .withMessage("Each sub-work link must be a valid URL"),

  body("status")
    .optional()
    .isIn(["New", "Open", "Ongoing", "Closed", "Complete", "Give Up", "Delayed"])
    .withMessage("Invalid status value"),
];
