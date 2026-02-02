import { ethers } from "ethers";
import crypto from "crypto";

class TicketService {
  async generateTicket(eventId, userId) {
    const nonce = crypto.randomUUID();

    return ethers.keccak256(ethers.toUtf8Bytes(`${eventId}: ${userId}:${nonce}`));
  }

  generateQRPayload(ticketId) {
    return JSON.stringify({
      ticketId,
      version: 1,
    });
  }

  parseQRPayload(payload) {
    try {
      const data = JSON.parse(payload);

      if (!data.ticketId || !ethers.isHexString(data.ticketId, 32)) {
        throw new Error("Invalid ticket ID");
      }

      return {
        ticketId: data.ticketId,
        eventId: data.eventId,
        version: data.version ?? 1,
      };
    } catch {
      throw new Error("invalid QR code");
    }
  }
}

export default new TicketService();
