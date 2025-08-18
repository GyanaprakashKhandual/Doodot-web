// routes/todo.routes.js
const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const auth = require("../middlewares/auth.middleware");

// Protected routes
router.post("/", auth, createTodo);
router.get("/", auth, getTodos);
router.get("/:id", auth, getTodoById);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

module.exports = router;
