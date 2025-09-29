const express = require('express');
const router = express.Router();
const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    deleteMultipleTodos,
    searchTodos,
    filterTodos,
    getTodosByStatus,
    getTodosByPriority,
    getTodosByWorkType,
    getOverdueTodos,
    getUpcomingTodos,
    getTodaysTodos,
    getTodoStats,
    updateTodoStatus,
    bulkUpdateStatus
} = require('../controllers/todo.controller');

// Middleware to protect routes (assuming you have an auth middleware)
const { protect } = require('../middlewares/auth.middleware');

// Apply authentication to all routes
router.use(protect);

// ============ CRUD Operations ============

// Create new TODO
router.post('/', createTodo);

// Get all TODOs for the logged-in user
router.get('/', getAllTodos);

// Get single TODO by ID
router.get('/:id', getTodoById);

// Update TODO
router.put('/:id', updateTodo);

// Delete single TODO
router.delete('/:id', deleteTodo);

// Delete multiple TODOs
router.post('/bulk/delete', deleteMultipleTodos);

// ============ Status Operations ============

// Update only the status of a TODO
router.patch('/:id/status', updateTodoStatus);

// Bulk update status for multiple TODOs
router.patch('/bulk/status', bulkUpdateStatus);

// Get TODOs by status
router.get('/status/:status', getTodosByStatus);

// ============ Filter & Search Operations ============

// Search TODOs (query params: ?query=searchTerm)
router.get('/search/query', searchTodos);

// Filter TODOs (query params: ?workType=Personal&priority=HIGH&status=TODO&startDate=2025-01-01&endDate=2025-12-31&sortBy=createdAt&order=desc)
router.get('/filter/advanced', filterTodos);

// Get TODOs by priority
router.get('/priority/:priority', getTodosByPriority);

// Get TODOs by work type
router.get('/worktype/:workType', getTodosByWorkType);

// ============ Special Queries ============

// Get overdue TODOs
router.get('/special/overdue', getOverdueTodos);

// Get upcoming TODOs (next 7 days)
router.get('/special/upcoming', getUpcomingTodos);

// Get today's TODOs
router.get('/special/today', getTodaysTodos);

// Get TODO statistics/summary
router.get('/stats/summary', getTodoStats);

module.exports = router;