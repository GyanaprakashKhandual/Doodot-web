// validators/todoValidator.js
const { body } = require("express-validator");

exports.todoValidator = [

  body("workType")
    .optional()
    .isString().withMessage("Work type must be a string")
    .isLength({ max: 100 }).withMessage("Work type must not exceed 100 characters"),

  body("workDesc")
    .optional()
    .isString().withMessage("Work description must be a string")
    .isLength({ max: 500 }).withMessage("Work description must not exceed 500 characters"),

  body("startDate")
    .optional()
    .isISO8601().withMessage("Start date must be a valid date"),

  body("endDate")
    .optional()
    .isISO8601().withMessage("End date must be a valid date"),

  body("startTime")
    .optional()
    .isISO8601().withMessage("Start time must be a valid datetime"),

  body("endTime")
    .optional()
    .isISO8601().withMessage("End time must be a valid datetime"),

  body("links")
    .optional()
    .isArray().withMessage("Links must be an array of URLs"),

  body("links.*")
    .optional()
    .isURL().withMessage("Each link must be a valid URL"),
];
