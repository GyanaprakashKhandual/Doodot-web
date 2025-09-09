const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { todoValidator } = require('../middlewares/todo.validator');

// Routes
router.post('/create',protect, validate(todoValidator), todoController.createTodo);
router.get('/:userId',protect, todoController.getTodosByUser);
router.get('/:id',protect, todoController.getSingleTodo);
router.put('/:id',protect, todoController.updateTodo);
router.delete('/:id',protect, todoController.deleteTodo);

module.exports = router;
