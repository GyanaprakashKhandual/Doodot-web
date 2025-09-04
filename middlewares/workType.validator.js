const { body } = require("express-validator");

exports.workTypeValidation = [

  body("workTypeName")
    .notEmpty()
    .withMessage("Work type name is required")
    .isString()
    .withMessage("Work type name must be a string")
    .isLength({ min: 2 })
    .withMessage("Work type name must be at least 2 characters long"),

  body("workTypeDesc")
    .notEmpty()
    .withMessage("Work type description is required")
    .isString()
    .withMessage("Work type description must be a string")
    .isLength({ min: 5 })
    .withMessage("Work type description must be at least 5 characters long"),
];
