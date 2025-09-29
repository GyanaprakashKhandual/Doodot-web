const TODO = require('../models/todo.model');
const mongoose = require('mongoose');

// Create a new TODO
const createTodo = async (req, res) => {
  try {
    const { workType, workDesc, startDate, endDate, startTime, endTime, priority, status, links } = req.body;

    const newTodo = new TODO({
      user: req.user._id, // Assuming user is attached via auth middleware
      workType,
      workDesc,
      startDate,
      endDate,
      startTime,
      endTime,
      priority,
      status: status || 'TODO',
      links
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({
      success: true,
      message: 'TODO created successfully',
      data: savedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating TODO',
      error: error.message
    });
  }
};

// Get all TODOs for logged-in user
const getAllTodos = async (req, res) => {
  try {
    const todos = await TODO.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TODOs',
      error: error.message
    });
  }
};

// Get single TODO by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    const todo = await TODO.findOne({ _id: id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TODO',
      error: error.message
    });
  }
};

// Update TODO
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    // Prevent user field update
    delete updates.user;

    const updatedTodo = await TODO.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'TODO updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating TODO',
      error: error.message
    });
  }
};

// Delete TODO
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    const deletedTodo = await TODO.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'TODO deleted successfully',
      data: deletedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting TODO',
      error: error.message
    });
  }
};

// Delete multiple TODOs
const deleteMultipleTodos = async (req, res) => {
  try {
    const { ids } = req.body; // Array of IDs

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of TODO IDs'
      });
    }

    const result = await TODO.deleteMany({
      _id: { $in: ids },
      user: req.user._id
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} TODO(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting TODOs',
      error: error.message
    });
  }
};

// Search TODOs
const searchTodos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const todos = await TODO.find({
      user: req.user._id,
      $or: [
        { workDesc: { $regex: query, $options: 'i' } },
        { workType: { $regex: query, $options: 'i' } },
        { priority: { $regex: query, $options: 'i' } },
        { status: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching TODOs',
      error: error.message
    });
  }
};

// Filter TODOs with multiple criteria
const filterTodos = async (req, res) => {
  try {
    const { workType, priority, status, startDate, endDate, sortBy, order } = req.query;

    const filter = { user: req.user._id };

    // Add filters
    if (workType) filter.workType = workType;
    if (priority) filter.priority = priority;
    if (status) filter.status = status;

    // Date range filter
    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default sort
    if (sortBy) {
      const sortOrder = order === 'asc' ? 1 : -1;
      sortOptions = { [sortBy]: sortOrder };
    }

    const todos = await TODO.find(filter).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: todos.length,
      filters: { workType, priority, status, startDate, endDate },
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtering TODOs',
      error: error.message
    });
  }
};

// Get TODOs by status
const getTodosByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const validStatuses = ['TODO', 'Delayed', 'Give Up', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const todos = await TODO.find({ user: req.user._id, status }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      status,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TODOs by status',
      error: error.message
    });
  }
};

// Get TODOs by priority
const getTodosByPriority = async (req, res) => {
  try {
    const { priority } = req.params;

    const validPriorities = ['HIGH', 'Low', 'Medium', 'Urgent'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority value'
      });
    }

    const todos = await TODO.find({ user: req.user._id, priority }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      priority,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TODOs by priority',
      error: error.message
    });
  }
};

// Get TODOs by work type
const getTodosByWorkType = async (req, res) => {
  try {
    const { workType } = req.params;

    const validWorkTypes = ['Personal', 'Professional', 'Fun', 'Time Pass', 'Urgent'];
    if (!validWorkTypes.includes(workType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid work type value'
      });
    }

    const todos = await TODO.find({ user: req.user._id, workType }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      workType,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TODOs by work type',
      error: error.message
    });
  }
};

// Get overdue TODOs
const getOverdueTodos = async (req, res) => {
  try {
    const currentDate = new Date();

    const todos = await TODO.find({
      user: req.user._id,
      endDate: { $lt: currentDate },
      status: { $nin: ['Completed', 'Give Up'] }
    }).sort({ endDate: 1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching overdue TODOs',
      error: error.message
    });
  }
};

// Get upcoming TODOs (next 7 days)
const getUpcomingTodos = async (req, res) => {
  try {
    const currentDate = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(currentDate.getDate() + 7);

    const todos = await TODO.find({
      user: req.user._id,
      startDate: { $gte: currentDate, $lte: nextWeek },
      status: { $nin: ['Completed', 'Give Up'] }
    }).sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming TODOs',
      error: error.message
    });
  }
};

// Get today's TODOs
const getTodaysTodos = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todos = await TODO.find({
      user: req.user._id,
      startDate: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s TODOs',
      error: error.message
    });
  }
};

// Get statistics/summary
const getTodoStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await TODO.aggregate([
      { $match: { user: userId } },
      {
        $facet: {
          byStatus: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          byPriority: [
            { $group: { _id: '$priority', count: { $sum: 1 } } }
          ],
          byWorkType: [
            { $group: { _id: '$workType', count: { $sum: 1 } } }
          ],
          total: [
            { $count: 'count' }
          ]
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: stats[0].total[0]?.count || 0,
        byStatus: stats[0].byStatus,
        byPriority: stats[0].byPriority,
        byWorkType: stats[0].byWorkType
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TODO statistics',
      error: error.message
    });
  }
};

// Update TODO status only
const updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    const validStatuses = ['TODO', 'Delayed', 'Give Up', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const updatedTodo = await TODO.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'TODO status updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating TODO status',
      error: error.message
    });
  }
};

// Bulk update status
const bulkUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of TODO IDs'
      });
    }

    const validStatuses = ['TODO', 'Delayed', 'Give Up', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const result = await TODO.updateMany(
      { _id: { $in: ids }, user: req.user._id },
      { status }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} TODO(s) updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating TODOs',
      error: error.message
    });
  }
};

module.exports = {
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
};