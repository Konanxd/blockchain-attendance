import { prisma } from "../utils/prisma.ts";
import ticketService from "../services/ticket.service.js";
import qrCodeService from "../services/qrCode.service.js";

export const createTicket = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        error: "userId and eventId are required!",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!user || !event) {
      return res.status(404).json({
        error: "User or Event not found!",
      });
    }

    const ticketId = await ticketService.generateTicket(event.eventCode, user.id);

    const ticket = await prisma.ticket.create({
      data: {
        ticketId: ticketId,
        userId: userId,
        eventId: eventId,
      },
    });

    return res.status(201).json({
      success: true,
      ticket,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

export const getTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { ticketId },
      include: {
        event: true,
        user: true,
      },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    return res.json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getTicketQR = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { ticketId },
      include: { event: true },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const payload = ticketService.generateQRPayload(ticket.ticketId);
    const qrCode = await qrCodeService.generate(payload);

    return res.json({
      ticketId,
      event: ticket.event.name,
      qrPayload: payload,
      qrCode, // base64
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const { userId } = req.params;

    const tickets = await prisma.ticket.findMany({
      where: { userId: Number(userId) },
      include: { event: true },
    });

    return res.json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
