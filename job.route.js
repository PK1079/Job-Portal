import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAlljob, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAlljob);
router.route("/getadmin").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);

export default router;
