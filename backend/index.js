import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jobRequestRoute from "./Route/jobRequestRoute.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRequestRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error"
  });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
