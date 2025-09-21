const express = require('express');
const router = express.Router();
const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    getTodoStats
} = require('../controllers/todo.controller');
const { todoValidator } = require('../middlewares/todo.validator');
const validate = require('../middlewares/validate.middleware');
const protect = require('../middlewares/auth.middleware');

router.use(protect);


router.post('/', validate(todoValidator), createTodo);
router.get('/', getAllTodos);
router.get('/stats', getTodoStats);
router.get('/:id', getTodoById);
router.put('/:id', validate(todoValidator), updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;