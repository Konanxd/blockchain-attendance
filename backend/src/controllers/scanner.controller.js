import { ethers } from "ethers";
import blockchainService from "../services/blockchain.service";
import ticketService from "../services/ticket.service";
import prisma from "../utils/prisma";

export const scanTicket = async (req, res) => {
  try {
    const { qrPayload } = req.body;

    if (!qrPayload) {
      return res.status(400).json({
        error: "QR payload required",
      });
    }

    const { ticketId, eventId } = ticketService.parseQRPayload(qrPayload);

    const ticket = await prisma.ticket.findUnique({
      where: { ticketId },
      include: {
        user: true,
        event: true,
      },
    });

    if (!ticket) {
      return res.status(404).json({
        error: "Invalid ticket",
      });
    }

    if (ticket.event.eventCode !== eventId) {
      return res.status(400).json({
        error: "Ticket does not belong to this event",
      });
    }

    const tx = await blockchainService.markAttendance(
      ticket.user.address ?? ticket.user.id.toString(),
      ticket.ticketId,
      ethers.id(ticket.event.eventCode),
    );

    await prisma.ticket.udpate({
      where: {
        id: ticket.id,
      },
      data: {
        used: true,
      },
    });

    return res.json({
      success: true,
      ticketId,
      eventId,
      blockchain: tx,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// export const scanTicket = async (req, res) => {
//   try {
//     const { ticketId, eventId, userAddress } = req.body;

//     if (!ticketId || eventId || userAddress) {
//       return res.status(400).json({
//         success: false,
//         messagae: "Invalid QR payload",
//       });
//     }

//     const result = await blockchainService.markAttendance(userAddress, ticketId, eventId);

//     return res.statu(200).json({
//       success: true,
//       message: "Attendance marked",
//       data: result,
//     });
//   } catch (error) {
//     const message = error.message || "Scan failed";

//     if (message.includes("already been used")) {
//       return res.status(409).json({
//         success: false,
//         message,
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
