import { prisma } from "../utils/prisma.ts";
import ticketService from "../services/ticket.service.js";
import qrCodeService from "../services/qrCode.service.js";
import blockchainService from "../services/blockchain.service.js";
import { ethers } from "ethers";

async function testFlow() {
  console.log("Testing real flow test...\n");

  const operator = await prisma.operator.findFirst();
  const event = await prisma.event.findFirst();
  const user = await prisma.user.findFirst({
    include: {
      tickets: true,
    },
  });

  if (!operator || !event || !user || user.tickets.length === 0) {
    throw new Error("Missing seed data");
  }

  const ticket = user.tickets[0];

  const userAddress = ethers.getAddress(
    ethers.keccak256(ethers.toUtf8Bytes(`user:${user.id}`)).slice(0, 42),
  );

  console.log(`Operator: ${operator.name}`);
  console.log(`Event: ${event.name}`);
  console.log(`User: ${user.name}`);
  console.log(`Ticket: ${ticket.ticketId}`);

  const qrPayload = ticketService.generateQRPayload(ticket.ticketId);
  const qrCode = await qrCodeService.generate(qrPayload);

  console.log("\n QR Payload:", qrPayload);
  console.log("QR Code generated (base64)");

  console.log("Sending attendance to blockchain...");

  const tx = await blockchainService.markAttendance(userAddress, ticket.ticketId, event.eventCode);

  console.log("Blockchain TX: ", tx.transactionHash);

  await prisma.ticket.update({
    where: {
      id: ticket.id,
    },
    data: {
      used: true,
    },
  });

  console.log("Ticket marked as used in DB");

  const verified = await blockchainService.verifyAttendance(ticket.ticketId);

  console.log("\n On-chain verification:", verified ? "VALID" : "INVALID");
  console.log("\n Flow test completed successfully!");
}

testFlow()
  .catch((e) => {
    console.error("\n Flow test failed");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
