const express = require('express');
const dotenv = require('dotenv');
const path = require('path');



// Routes 
const authRoutes = require('./routes/user.route');
const todoRoutes = require('./routes/todo.routes');

// Functions
const connectDB = require('./config/DB');

dotenv.config();
const app = express();

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://doodot.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// Middleware
app.use(express.json());

// Connect to Database
connectDB();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);
// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});