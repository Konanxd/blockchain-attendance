import express from "express";
import {
  createTicket,
  getTicket,
  getTicketQR,
  getUserTickets,
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/:ticketId", getTicket);
router.get("/:ticketId/qr", getTicketQR);
router.get("/user/:userId", getUserTickets);

export default router;
