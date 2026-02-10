import express from "express";
import { scanAttendance, getEventAttendees } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/scan", scanAttendance);
router.get("/:eventId", getEventAttendees);

export default router;
