import blockchainService from "../services/blockchain.service.js";
import { prisma } from "../utils/prisma.ts";
import ticketService from "../services/ticket.service.js";

export const scanAttendance = async (req, res) => {
  try {
    const { qrPayload } = req.body;

    if (!qrPayload) {
      return res.status(400).json({
        error: "QR Payload required",
      });
    }

    const { ticketId } = ticketService.parseQRPayload(qrPayload);

    const ticket = await prisma.ticket.findUnique({
      where: { ticketId },
      include: { user: true, event: true },
    });

    if (!ticket) {
      return res.status(404).json({
        error: "Ticket not found",
      });
    }

    if (ticket.used) {
      return res.status(400).json({
        error: "Ticket already used",
      });
    }

    console.log(ticket)
    const tx = await blockchainService.markAttendance(ticket.ticketId, ticket.event.eventCode);

    await prisma.ticket.update({
      where: { ticketId },
      data: { used: true },
    });

    return res.json({
      success: true,
      message: "Attendance recorded!",
      blockchain: tx,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

export const verifyAttendance = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const onChain = await blockchainService.verifyAttendance(ticketId);

    return res.json({
      success: true,
      verified: onChain,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

export const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;

    const tickets = await blockchainService.getEventAttendees(eventId);

    const records = []
    for (let t of tickets) {
      records.push({
        ticketId: t,
        timestamp: Number(record.timestamp)
      })
    }

    return ticketIds
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

