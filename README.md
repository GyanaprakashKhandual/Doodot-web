# DooDot Backend

A robust and secure backend API for the DooDot task management application, built with modern Node.js technologies.

## ✨ Features

✅ **User Authentication** - JWT-based auth with Google OAuth integration  
✅ **Password Security** - bcrypt encryption for user credentials  
✅ **Email Services** - OTP verification and notifications  
✅ **Session Management** - Secure cookie-based sessions  
✅ **Data Validation** - Request sanitization and validation  
✅ **CORS Support** - Cross-origin resource sharing enabled  
✅ **Environment Config** - Secure environment variable management

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Core Dependencies

✅ **Express.js** - Backend Web Framework  
✅ **Mongoose** - MongoDB Object Data Modeling (ODM) library  
✅ **bcrypt/bcryptjs** - Password hashing and encryption libraries  
✅ **jsonwebtoken (JWT)** - Authentication & token generation  
✅ **cors** - Middleware for Cross-Origin Resource Sharing  
✅ **dotenv** - Environment variable management  
✅ **nodemailer** - Email service (for OTP and notifications)  
✅ **express-session** - Session management middleware  
✅ **cookie-session** - Lightweight cookie-based session handling  
✅ **express-validator** - Request validation and sanitization  
✅ **passport** - Authentication middleware  
✅ **passport-google-oauth20** - Google OAuth 2.0 strategy for Passport  
✅ **nodemon** - Development utility for auto-restarting server

## 🚀 Quick Setup

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/GyanaprakashKhandual/Doodot-web.git
   cd Doodot-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Required Environment Variables**

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Start Production Server**
   ```bash
   npm start
   ```

**Made with ❤️ for productive task management**
