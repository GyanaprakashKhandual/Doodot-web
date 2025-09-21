const { body } = require("express-validator");

exports.todoValidator = [
  body("workType")
    .optional()
    .isIn(['Personal', 'Professional', 'Fun', 'Time Pass', 'Urgent'])
    .withMessage("Invalid work type. Allowed values: Personal, Professional, Fun, Time Pass, Urgent"),

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

  body("priority")
    .optional()
    .isIn(['HIGH', 'Low', 'Medium', 'Urgent'])
    .withMessage("Invalid priority. Allowed values: HIGH, Low, Medium, Urgent"),

  body("status")
    .optional()
    .isIn(['TODO', 'Delayed', 'Give Up', 'In Progress', 'Completed'])
    .withMessage("Invalid status. Allowed values: TODO, Delayed, Give Up, In Progress, Completed"),

  body("links")
    .optional()
    .isArray().withMessage("Links must be an array of URLs"),

  body("links.*")
    .optional()
    .isURL().withMessage("Each link must be a valid URL"),
];