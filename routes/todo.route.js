const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Routes
router.post('/create', todoController.createTodo);
router.get('/user/:userId', todoController.getTodosByUser);
router.get('/:id', todoController.getSingleTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
