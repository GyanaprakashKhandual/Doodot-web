const express = require('express');
const router = express.Router();

// Controller
const { registerUser, loginUser } = require('../controllers/user.controller');

// Validations
const { registerValidation, loginValidation } = require('../middlewares/user.middleware');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerValidation, registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginValidation, loginUser);

module.exports = router;
