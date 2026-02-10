import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  createTicket,
  getTicket,
  getTicketQR,
  getUserTickets,
  getTicketUnique
} from "../controllers/ticket.controller.js";
import { verifyAttendance } from "../controllers/attendance.controller.js"; 

const router = express.Router();

router.post("/create", createTicket);
router.get("/user/:userId", requireAuth, getUserTickets);

router.post("/verify-transaction", verifyAttendance);

//router.get("/:ticketId", getTicket);
router.get("/:ticketId/qr", getTicketQR);
router.get("/:id", requireAuth, getTicketUnique);

export default router;
