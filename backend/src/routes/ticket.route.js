import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  createTicket,
  getTicket,
  getTicketQR,
  getUserTickets,
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.post("/create", createTicket);
router.get("/:ticketId", getTicket);
router.get("/:ticketId/qr", getTicketQR);
router.get("/user/:userId", requireAuth, getUserTickets);

export default router;
