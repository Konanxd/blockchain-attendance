import express from "express";
import { scanAttendance } from "../controllers/attendace.controller.js";

const router = express.Router();

router.post("/scan", scanAttendance);

export default router;
