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
// class AttendanceController {
//   async markAttendance(req, res) {
//     try {
//       const { userId, ticketId, eventId } = req.body;

//       if (!userId || ticketId || eventId) {
//         return res.status(400).json({
//           error: "Missing required fields: userId, ticketId, eventId",
//         });
//       }

//       let wallet = walletService.getUserWallet(userId);
//       if (!wallet) {
//         wallet = walletService.createWalletForUser(userId);
//         console.log(`Create new wallet for user ${userId}: ${wallet.address}`);
//       }

//       const result = await blockchainService.markAttendance(wallet.address, ticketId, eventId);

//       res.json({
//         success: true,
//         message: "Attendance marked successfully!",
//         data: {
//           userAddress: wallet.address,
//           ticketId,
//           eventId,
//           transactionHash: result.transactionHash,
//           blockNumber: result.blockNumber,
//         },
//       });
//     } catch (error) {
//       console.error("Error in markAttendance: ", error);
//       req.status(500).json({
//         error: error.message || "Failed to mark attendance",
//       });
//     }
//   }

//   async verifyTicket(req, res) {
//     try {
//       const { ticketId } = req.params;

//       const hasAttended = await blockchainService.verifyAttendance(ticketId);

//       if (hasAttended) {
//         const record = await blockchainService.getAttendanceRecord(ticketId);
//         res.json({
//           verified: true,
//           message: "Ticket has been used",
//           record,
//         });
//       } else {
//         res.json({
//           verified: false,
//           message: "Ticket has not been used",
//         });
//       }
//     } catch (error) {
//       console.error("Error in verifyTicket: ", error);
//       req.status(500).json({
//         error: error.message || "Failed to verify ticket",
//       });
//     }
//   }

//   async getRecord(req, res) {
//     try {
//       const { ticketId } = req.params;
//       const record = await blockchainService.getAttendanceRecord(ticketId);

//       res.json({
//         success: true,
//         data: record,
//       });
//     } catch (error) {
//       console.error("Error in getRecord: ", error);
//       req.status(500).json({
//         error: error.message || "Failed to get record",
//       });
//     }
//   }

//   async getEventAttendees(req, res) {
//     try {
//       const { eventId } = req.params;
//       const ticketIds = await blockchainService.getEventAttendees(eventId);

//       res.json({
//         success: true,
//         eventId,
//         totalAttendees: ticketIds.length,
//         ticketIds,
//       });
//     } catch (error) {
//       console.error("Error in getEventAttendees: ", error);
//       req.status(500).json({
//         error: error.message || "Failed to get event attendees",
//       });
//     }
//   }

//   async createWallet(req, res) {
//     try {
//       const { userId } = req.params;

//       if (!userId) {
//         return res.status(400).json({
//           error: "userId is required!",
//         });
//       }

//       const existingWallet = walletService.getUserWallet(userId);
//       if (existingWallet) {
//         return res.json({
//           message: "Wallet already exists!",
//           address: existingWallet.address,
//         });
//       }

//       const wallet = walletService.createWalletForUser(userId);

//       res.json({
//         success: true,
//         message: "Wallet created successfully",
//         data: wallet,
//       });
//     } catch (error) {
//       console.error("Error in createWallet: ", error);
//       req.status(500).json({
//         error: error.message || "Failed to create wallet",
//       });
//     }
//   }
// }

// export default new AttendanceController();
