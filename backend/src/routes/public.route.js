import express from "express";
import { verifyAttendance } from "../controllers/attendace.controller.js";

const router = express.Router();

router.get("/verify/:ticketId", verifyAttendance);

export default router;
