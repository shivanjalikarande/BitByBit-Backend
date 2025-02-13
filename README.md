# BitByBit Backend - Gamified Learning Platform

This is the backend for the gamified learning platform built using **Node.js (Express.js)** and **Firebase Firestore** as the database.

## 🚀 Getting Started

### 1️⃣ Prerequisites
- Install **Node.js** (v16+ recommended)
- Install **npm** (comes with Node.js)
- Ensure **Git** is installed

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo/backend
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Set Up Environment Variables
Create a `.env` file inside the `backend/` folder and add the following:
```ini
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xyz@your-project.iam.gserviceaccount.com
PORT=5000
```
📌 **Note:** The actual Firebase credentials should NOT be committed. If you're a collaborator, ask the project owner for access.

### 5️⃣ Running the Backend Server
```sh
node index.js
```
By default, the backend will run on **http://localhost:5000**

## 🔥 API Endpoints
| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| GET    | `/api/challenges`   | Fetch available coding challenges |
| POST   | `/api/submit`       | Submit a coding challenge solution |
| GET    | `/api/user/:id`     | Fetch user details & progress     |

## 📁 Project Structure
```
backend/
│── models/                   # Data models
│── routes/                    # API Routes
│── controllers/               # API Controllers
│── config/                    # Config files (Firebase setup)
│── index.js                   # Express.js server setup
│── .env.example               # Sample environment file
│── package.json               # Dependencies
│── README.md                  # Project documentation
```

## 🔧 Firebase Setup (Only for Maintainers)
If you're setting up Firebase for the first time:
1️⃣ Go to **Firebase Console** and create a Firestore database.
2️⃣ Navigate to **Project Settings → Service Accounts**.
3️⃣ Click **Generate New Private Key** and download `serviceAccountKey.json`.
4️⃣ Place it inside `backend/config/` (Do NOT commit this file!).

## 🚀 Deployment Guide
For deployment, configure Firebase and environment variables on the server.
- **Frontend:** Deploy with Vercel
- **Backend:** Use Railway or Firebase Functions

## 👥 Collaborators
If you're a contributor:
1️⃣ Clone the repo
2️⃣ Request `.env` variables from the owner
3️⃣ Run `npm install` & start development

📌 **Security Note:** Never push `.env` or `serviceAccountKey.json` to GitHub.

---

Now your README is structured clearly for both **new developers** and **maintainers**! 🚀 Let me know if you need any changes!

