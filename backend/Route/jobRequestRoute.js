import express from "express";
import { GetAllPostedJobs, createJobPost, getJobsById, updateJobStatus, deleteJobPost } from "../Controller/jobRequestController.js";

const router = express.Router();

router.get("/", GetAllPostedJobs);
router.post("/", createJobPost);
router.get("/:id", getJobsById);
router.patch("/:id", updateJobStatus);
router.delete("/:id", deleteJobPost);

export default router;
