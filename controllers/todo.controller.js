const TODO = require('../models/todo.model');
const { validationResult } = require('express-validator');

// Create a new TODO
exports.createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      workType,
      workDesc,
      startDate,
      endDate,
      startTime,
      endTime,
      priority,
      status,
      links
    } = req.body;

    const todo = new TODO({
      user: req.user._id,
      workType,
      workDesc: workDesc || "No Work Description",
      startDate,
      endDate,
      startTime,
      endTime,
      priority,
      status: status || 'TODO',
      links: links || []
    });

    const savedTodo = await todo.save();
    res.status(201).json({
      message: 'TODO created successfully',
      todo: savedTodo
    });
  } catch (error) {
    console.error('Create TODO error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all TODOs with filtering and pagination
exports.getAllTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { user: req.user._id };

    // Add optional filters
    if (req.query.workType) {
      filter.workType = { $in: req.query.workType.split(',') };
    }

    if (req.query.priority) {
      filter.priority = { $in: req.query.priority.split(',') };
    }

    if (req.query.status) {
      filter.status = { $in: req.query.status.split(',') };
    }

    // Date range filters
    if (req.query.startDateFrom || req.query.startDateTo) {
      filter.startDate = {};
      if (req.query.startDateFrom) {
        filter.startDate.$gte = new Date(req.query.startDateFrom);
      }
      if (req.query.startDateTo) {
        filter.startDate.$lte = new Date(req.query.startDateTo);
      }
    }

    if (req.query.endDateFrom || req.query.endDateTo) {
      filter.endDate = {};
      if (req.query.endDateFrom) {
        filter.endDate.$gte = new Date(req.query.endDateFrom);
      }
      if (req.query.endDateTo) {
        filter.endDate.$lte = new Date(req.query.endDateTo);
      }
    }

    // Search in work description
    if (req.query.search) {
      filter.workDesc = { $regex: req.query.search, $options: 'i' };
    }

    const todos = await TODO.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const total = await TODO.countDocuments(filter);

    res.json({
      todos,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get TODOs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single TODO by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await TODO.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('user', 'name email');

    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' });
    }

    res.json({ todo });
  } catch (error) {
    console.error('Get TODO by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid TODO ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update TODO
exports.updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      workType,
      workDesc,
      startDate,
      endDate,
      startTime,
      endTime,
      priority,
      status,
      links
    } = req.body;

    const updateData = {};
    if (workType !== undefined) updateData.workType = workType;
    if (workDesc !== undefined) updateData.workDesc = workDesc;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (startTime !== undefined) updateData.startTime = startTime;
    if (endTime !== undefined) updateData.endTime = endTime;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;
    if (links !== undefined) updateData.links = links;

    const todo = await TODO.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' });
    }

    res.json({
      message: 'TODO updated successfully',
      todo
    });
  } catch (error) {
    console.error('Update TODO error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid TODO ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete TODO
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TODO.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' });
    }

    res.json({ message: 'TODO deleted successfully' });
  } catch (error) {
    console.error('Delete TODO error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid TODO ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get TODO statistics
exports.getTodoStats = async (req, res) => {
  try {
    const stats = await TODO.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] }
          },
          todo: {
            $sum: { $cond: [{ $eq: ['$status', 'TODO'] }, 1, 0] }
          },
          delayed: {
            $sum: { $cond: [{ $eq: ['$status', 'Delayed'] }, 1, 0] }
          },
          byWorkType: {
            $push: {
              workType: '$workType',
              status: '$status'
            }
          }
        }
      },
      {
        $project: {
          total: 1,
          completed: 1,
          inProgress: 1,
          todo: 1,
          delayed: 1,
          workTypeBreakdown: {
            $arrayToObject: {
              $map: {
                input: ['Personal', 'Professional', 'Fun', 'Time Pass', 'Urgent'],
                as: "wt",
                in: {
                  k: "$$wt",
                  v: {
                    total: {
                      $size: {
                        $filter: {
                          input: "$byWorkType",
                          as: "item",
                          cond: { $eq: ["$$item.workType", "$$wt"] }
                        }
                      }
                    },
                    completed: {
                      $size: {
                        $filter: {
                          input: "$byWorkType",
                          as: "item",
                          cond: {
                            $and: [
                              { $eq: ["$$item.workType", "$$wt"] },
                              { $eq: ["$$item.status", "Completed"] }
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);

    res.json(stats[0] || {
      total: 0,
      completed: 0,
      inProgress: 0,
      todo: 0,
      delayed: 0,
      workTypeBreakdown: {}
    });
  } catch (error) {
    console.error('Get TODO stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};