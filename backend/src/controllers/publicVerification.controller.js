import blockchainService from "../services/blockchain.service";
import { prisma } from "../utils/prisma";
import { ethers } from "ethers";

export const verifyTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const verified = await blockchainService.verifyAttendance(ticketId);

    return res.json({
      ticketId,
      verified,
      source: "blockchain",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

export const getAttendanceRecord = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const record = await blockchainService.getAttendanceRecord(ticketId);

    if (!record.userAddress) {
      return res.status(404).json({
        error: e.message,
      });
    }

    return res.json({
      ...record,
      source: "blockchain",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

export const verifyEvent = async (req, res) => {
  try {
    const { eventCode } = req.params;

    const event = await prisma.event.findUnique({
      where: { eventCode },
    });

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    const tickets = await blockchainService.getEventAttendees(eventCode);

    return res.json({
      event: event.name,
      eventCode,
      totalAttended: tickets.length,
      tickets,
      source: "blockchain",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
