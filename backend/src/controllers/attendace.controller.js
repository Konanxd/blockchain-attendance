import blockchainService from "../services/blockchain.service.js";
import { prisma } from "../utils/prisma.ts";
import ticketService from "../services/ticket.service.js";
import etherscanService from "../services/etherscan.service.js";
import { ethers } from "ethers";

export const scanAttendance = async (req, res) => {
  try {
    const { qrPayload } = req.body;
    const { ticketId } = JSON.parse(qrPayload);

    const updatedTicket = await prisma.ticket.update({
      where: { ticketId: ticketId },
      data: { used: true },
      include: { 
        user: true,
        event: true
      }
    });

    const blockchainRes = await blockchainService.markAttendance(ticketId, updatedTicket.eventId);
    const etherscanRes = await etherscanService.getTransactionReceipt(blockchainRes.transactionHash);

    return res.json({
      success: true,
      message: "Attendance recorded!",
      blockchain: blockchainRes,
      attendeeDetails: {
        name: updatedTicket.user.name,
        section: "102",
        row: "G",
        seat: "14",
        ticketId: updatedTicket.ticketId
      },
      etherscan:
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ticketIds = await blockchainService.getEventAttendees(eventId); 

    if (!ticketIds || ticketIds.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    const records = await Promise.all(
      ticketIds.map(async (id) => {
        try {
          const record = await blockchainService.getAttendanceRecord(id);
          return {
            ticketId: id,
            timestamp: record && record.timestamp ? Number(record.timestamp) : Math.floor(Date.now() / 1000)
          };
        } catch (itemError) {
          console.warn(`Gagal ambil detail untuk ticket ${id}:`, itemError.message);
          return null;
        }
      })
    );

    const validRecords = records.filter(r => r !== null);

    return res.json({
      success: true,
      data: validRecords
    });
  } catch (error) {
    console.error("ERROR BLOCKCHAIN FETCH:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Gagal mengambil data dari blockchain",
      error: error.message 
    });
  }
};

export const verifyAttendance = async (req, res) => {
  try {
    const idToVerify = req.body.ticketId || req.body.txHash || req.body.checkTicketId;

    console.log("--- DEBUG CONTROLLER ---");
    console.log("Body diterima:", req.body);

    if (!idToVerify) {
      return res.status(400).json({ 
        success: false, 
        message: "Data missing! Gunakan 'ticketId' atau 'txHash' di JSON." 
      });
    }

    const onChain = await blockchainService.verifyAttendance(idToVerify);

    return res.json({
      success: true,
      verified: onChain,
    });
  } catch (e) {
    console.error("Error di Controller:", e);
    return res.status(500).json({ error: e.message });
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
