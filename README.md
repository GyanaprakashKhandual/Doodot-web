# Doodot Backend • Bug Tracking API

![Node](https://img.shields.io/badge/Node.js-18%2B-3C873A?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-^8.x-880000)
![Auth](https://img.shields.io/badge/Auth-JWT%20%7C%20Google%20OAuth2-blue?logo=google)
![Lint](https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint)
![Tests](https://img.shields.io/badge/Tests-Jest%20%7C%20Supertest-99424f)
![License](https://img.shields.io/badge/License-MIT-green)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

**Doodot** is a TODO web application  **separated by Work Type and Users**. The backend provides secure APIs for authentication (email/password + Google), Work Type management, Work and Sub Work CRUD with status transitions/dragging, filtering/sorting/pagination and activity auditing.

## ✨ Backend Highlights

- ✅ **Auth**: Email/Password (JWT) + **Google OAuth 2.0**  
- ✅ **Project-scoped data**: All bugs belong to a specific project  
- ✅ **Bug lifecycle**: create / edit / delete / drag (status order) / assign / comment  
- ✅ **Filtering**: by status, priority, type, date range; sorting & pagination  
- ✅ **Views-ready**: APIs support data for Card, Table and Chart views   
- ✅ **Security**: rate limiting, CORS, Helmet, strong validation  

---

## 🧱 Tech Stack

- **Runtime**: Node.js (18+)  
- **Framework**: Express 5  
- **Database**: MongoDB + Mongoose  
- **Auth**: JWT (access/refresh) + Google OAuth 2.0 (Passport or OAuth client)  


```bash
# Clone the repository
git clone https://github.com/GyanaprakashKhandual/DooDot-web.git/

# Go inside the project
cd DooDot-web

# Install dependencies
npm install

# Add ENV and start server
nodemon index.js
