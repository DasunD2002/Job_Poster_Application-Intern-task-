import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import jobRequestRoute from "./Route/jobRequestRoute.js";

configDotenv();

const app = express();
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server Successfully Run on Port ${PORT}`);
});

app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Application Successfully connected to MongoDB...")
  } catch (err) {
    console.log("Error while connecting application into MongoDB..");
    console.log("Error: ", err);
  }
})();

app.use("/api/v1/jobs", jobRequestRoute);
