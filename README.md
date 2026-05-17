# Job Poster Application

This is a simple web application where users can register, login, and post jobs (like plumbing, painting, electrical work, etc.). Other users can view all posted jobs on the home page. Logged-in users can also see their own job posts and Only the logged users can do the posting and delete posts according to specification. Without Login Users can see all the posts and update its progress.

The application has two main parts:

1. **backend**: The server-side API built with Node.js, Express, and MongoDB.
2. **frontend**: The client-side website built with Next.js and React.

## Project Setup Instructions

To get the project running on your computer, please follow these steps:

### Prerequisites

Make sure you have [Node.js] installed on your computer.

### Step 1: Backend Setup

1. Open your terminal or command prompt.
2. Go to the `backend` folder:
   type in CMD: cd backend

3. Install all required packages:
   type in CMD: npm install

4. Create a file named `.env` inside the `backend` folder (if it does not exist) and add the environment variables shown below.

---

### Step 2: Frontend Setup

1. Open a new terminal or command prompt.
2. Go to the `frontend` folder:
   type in CMD: cd frontend

3. Install all required packages:
   type in CMD: npm install

4. Create a file named `.env` inside the `frontend` folder (if it does not exist) and add the environment variables shown below.

---

## Environment Variables

You need to set up environment variables in both the `backend` and `frontend` folders.

### 1. Backend `.env` Variables

Create a file named `.env` in the `backend/` folder and paste this:

PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key_for_login

### 2. Frontend `.env` Variables

Create a file named `.env` in the `frontend/` folder and paste this:

NEXT_PUBLIC_API_URL=http://localhost:5000

### `*Note that all the Environment variable vales I will send with Email*`

---

## How to Run the Application

You need to run both the backend server and the frontend website at the same time.

### Running the Backend

1. Open a terminal in the `backend` folder.
2. Run this command:
   type in CMD: npm run start

   This will start the backend server on `http://localhost:5000`.

### 🏃‍♂️ Running the Frontend

1. Open a terminal in the `frontend` folder.
2. Run this command:
   type in CMD: npm run dev

   This will start the frontend website on `http://localhost:3000`. Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the app!

---

### How to Run Tests

I have created Two automated tests to check if the backend is working correctly.

1. Open a terminal in the `backend` folder.
2. Run this command:
   type in CMD: npm test
