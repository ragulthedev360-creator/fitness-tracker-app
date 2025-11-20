# 🏋️‍♂️ Fitness Tracker App — README

A complete fitness tracking application with workout plans, exercise images, progress tracking, and session management.

---

## 📌 Tech Stack

### **Mobile App (React Native )**
- React Native
- React Navigation
- Async Storage / Secure Storage
- Axios (API Calls)

### **Backend**
- Node.js + Express.js
- MySQL Database
- JWT Authentication

---

# 📱 Mobile App — Build & Run Instructions

## 1. Clone the Repository
```sh
git clone https://github.com/ragulthedev360-creator/fitness-tracker-app.git
cd fitness-tracker-app/mobile
```

## 2. Install Dependencies
```sh
npm install
```

## 3. Setup Environment Variables
Create a `.env` file:


# 🖥️ Backend — Build & Run Instructions

## 1. Navigate to Backend Folder
```sh
cd fitness-tracker-app/backend
```

## 2. Install Dependencies
```sh
npm install
```

## 3. Setup Environment Variables
Create `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=fitness_app
JWT_SECRET=supersecretkey
IMAGE_UPLOAD_PATH=uploads/
```

## 4. Create MySQL Database
```sql
CREATE DATABASE fitness_app;
```

## 5. Start Server
```sh
npm start

# 🏃 Running Full App

1. Start Backend
```sh
cd backend
npm start
```

2. Start Mobile App
```sh
cd mobile
 
3. Ensure `.env` is correct
 
