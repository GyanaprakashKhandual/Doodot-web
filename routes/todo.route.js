const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const protect = require('../middlewares/auth.middleware'); // ✅ ensures req.user is set

// All routes require authentication
router.post('/create', protect, todoController.createTodo);
router.get('/', protect, todoController.getMyTodos);
router.get('/:id', protect, todoController.getSingleTodo);
router.put('/:id', protect, todoController.updateTodo);
router.delete('/:id', protect, todoController.deleteTodo);

module.exports = router;
