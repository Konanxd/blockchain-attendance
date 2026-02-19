import blockchainService from "../services/blockchain.service.js";
import { prisma } from "../utils/prisma.ts";
import ticketService from "../services/ticket.service.js";
import etherscanService from "../services/etherscan.service.js";

export const scanAttendance = async (req, res) => {
  try {
    const { qrPayload } = req.body;
    const { ticketId } = JSON.parse(qrPayload);

    const ticket = await prisma.ticket.findUnique({
      where: { ticketId: ticketId },
      include: { 
        user: true, 
        event: true 
      }
    });


    const blockchainRes = await blockchainService.markAttendance(ticketId, ticket.event.eventCode);

    let etherscanRes = null;
    try {
       etherscanRes = await etherscanService.getTransactionReceipt(blockchainRes.transactionHash);
    } catch (e) {
       console.log("Etherscan receipt belum siap, abaikan sementara.");
    }

    await prisma.ticket.update({
      where: { ticketId: ticketId },
      data: { used: true },
      include: { 
        user: true, 
        event: true 
      }
    });

    return res.json({
      success: true,
      message: "Attendance recorded!",
      blockchain: blockchainRes,
      attendeeDetails: {
        name: ticket.user.name,
        section: "102",
        row: "G",
        seat: "14",
        ticketId: ticketId
      },
      etherscan: etherscanRes,
    });

  } catch (error) {
    console.error("Error Detail di Controller:", error);
    // Jika error karena tiket sudah dipakai, Prisma akan melempar error unik
    res.status(500).json({ success: false, error: error.message });
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
    const ticketIds = await blockchainService.getEventAttendees(eventId); 
    console.log("Ticket IDs fetched:", ticketIds);

    if (!ticketIds || ticketIds.length === 0) return res.json({ success: true, data: [] });

    const records = await Promise.all(
      ticketIds.map(async (id) => {
        try {
          const record = await blockchainService.getAttendanceRecord(id);
          return { ticketId: id, timestamp: record?.timestamp ? Number(record.timestamp) : 0 };
        } catch { return null; }
      })
    );

    return res.json({ success: true, data: records.filter(r => r !== null) });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
};

