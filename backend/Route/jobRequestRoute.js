import express from "express";
import { GetAllPostedJobs, createJobPost, getJobsById, updateJobStatus, deleteJobPost, getMyPosts } from "../Controller/jobRequestController.js";
import { verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", GetAllPostedJobs);
router.post("/", verifyToken, createJobPost);
router.get("/myposts", verifyToken, getMyPosts);
router.get("/:id", getJobsById);
router.patch("/:id", updateJobStatus);
router.delete("/:id", verifyToken, deleteJobPost);

export default router;
