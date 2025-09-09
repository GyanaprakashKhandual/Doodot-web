const TODO = require('../models/todo');

// Create new TODO
exports.createTodo = async (req, res) => {
  try {
    const { workType, workDesc, startDate, endDate, startTime, endTime, links } = req.body;
    const userId = req.user?._id || req.body.user; // assuming userId comes from auth middleware or body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newTodo = new TODO({
      user: userId,
      workType,
      workDesc,
      startDate,
      endDate,
      startTime,
      endTime,
      links
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
};

// Get all todos for a user
exports.getTodosByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const todos = await TODO.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ count: todos.length, todos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error: error.message });
  }
};

// Get single todo
exports.getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TODO.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.body.user;

    const todo = await TODO.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.body.user;

    const todo = await TODO.findOneAndDelete({ _id: id, user: userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};
