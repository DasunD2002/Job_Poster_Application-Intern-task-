import express from "express";
import { GetAllPostedJobs, createJobPost, getJobsById, updateJobStatus, deleteJobPost } from "../Controller/jobRequestController.js";

const router = express.Router();

router.get("/getAllPostedJobs", GetAllPostedJobs);
router.post("/createJob", createJobPost);
router.get("/getJobById/:id", getJobsById);
router.patch("/updateStatus/:id", updateJobStatus);
router.delete("/deleteJob/:id", deleteJobPost);

export default router;
