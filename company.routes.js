import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, Updatecompany } from "../controllers/company.controller.js";


const router = express.Router();
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:Id").get(isAuthenticated,getCompanyById);
router.route("/update/:Id").put(isAuthenticated,Updatecompany);

export default router;
