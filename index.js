const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('./configs/passport.config');
const session = require('express-session');


const connectDB = require('./configs/db.config');


const authRoutes = require('./routes/user.route');
const todoRoutes = require('./routes/todo.route');

const app = express();
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);


app.use(passport.initialize());
app.use(passport.session());

connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://doodot-app-service.vercel.app',
        'https://doodot.nexly.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
    if (req.path === '/') {
        return next();
    }
    res.sendFile(path.join(__dirname, 'public', 'main.html'))
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/to-do', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
