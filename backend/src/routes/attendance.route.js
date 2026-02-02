import express from "express";
import { operatorAuth } from "../middlewares/operatorAuth.middleware";
import { scanTicket } from "../controllers/scanner.controller";

const router = express.Router();

// router.post("/mark", attendanceController.markAttendance);
// router.get("/verify:ticketId", attendanceController.verifyTicket);
// router.get("/record:ticketId", attendanceController.getRecord);
// router.get("/event:eventId", attendanceController.getEventAttendees);
// router.post("/wallet", attendanceController.createWallet);

// router.post("/scan", operatorAuth, scanTicket);

export default router;
