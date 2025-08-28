const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully on cloud')
        console.log(`Host: ${conn.connection.host}`);
    } catch (error) {
        console.error('\nInternal Database Error');
        console.error(`Error Message: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

