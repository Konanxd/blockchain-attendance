import { ethers } from "ethers";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import "dotenv/config.js";
import etherscanService from "../services/etherscan.service.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BlockchainService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    this.wallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, this.provider);

    // this.adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);

    const abiPath = path.join(__dirname, "../../abi/Attendance.json");
    const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8")).abi;

    this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, this.wallet);

    console.log("Blockchain service initialized!");
    console.log(`Operatore address: ${this.wallet.address}`);
    console.log(`Contract address: ${process.env.CONTRACT_ADDRESS}`);
  }

  async markAttendance(ticketId, eventId) {
    try {
      console.log("Marking attendance: ", { ticketId, eventId });

      const ticketIdBytes = ticketId;
      const eventIdBytes = ethers.id(eventId);

      const isUsed = await this.contract.verifyAttendance(ticketIdBytes);
      if (isUsed) {
        throw new Error("Ticket has already been used");
      }
      const signerAddress = await this.contract.runner.getAddress();
      const isOperator = await this.contract.operators(signerAddress);
      const owner = await this.contract.owner();

      console.log({ signerAddress, isOperator });

      if (owner.toLowerCase() === signerAddress.toLowerCase()) {
          console.log("Signer is Owner. Forcing operator update...");
          const txOp = await this.contract.addOperator(signerAddress);
          await txOp.wait();
          console.log("Operator re-added successfully.");
      } else {
          console.warn("Signer is NOT the owner. Ensure the owner has added this address.");
      }

      const tx = await this.contract.markAttendance(
        ticketIdBytes,
        eventIdBytes,
      );
      console.log(`Transaction sent: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`Transaction confirmed on block: ${receipt.blockNumber}`);

      console.log('Etherscan result:\n')
      const etherscanTx = await etherscanService.getTransactionReceipt(tx.hash)
      console.log(etherscanTx)

      return {
        success: true,
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error("Error marking attendance: ", error.message);
      if (error.data) {
        // Mencoba mendecode error message dari kontrak
        const decodedError = this.contract.interface.parseError(error.data);
        console.error("Revert Reason:", decodedError?.name);
      }
      console.error("Full Error:", error);
      throw error;
    }
  }

  async verifyAttendance(idInput) {
    try {
      if (!idInput) {
        console.error("Service Error: idInput is missing");
        return false;
      }
      console.log("Service: Memverifikasi ke Kontrak dengan ID Asli:", idInput);

      const status = await this.contract.verifyAttendance(idInput);
      return status;
    } catch (error) {
      console.error("Service Error:", error.message);
      throw error;
    }
  }

  async getAttendanceRecord(ticketId) {
    try {
      if (!ticketId) throw new Error("ticketId is required");

      const ticketIdBytes = ticketId.startsWith('0x') ? ticketId : ethers.id(ticketId);
      const record = await this.contract.getAttendanceRecord(ticketIdBytes);

      return {
        ticketId: record.ticketId,
        timestamp: Number(record.timestamp),
        eventId: record.eventId,
        date: new Date(Number(record.timestamp) * 1000).toISOString(),
      };
    } catch (error) {
      console.error("Error getting attendance record: ", error.message);
      throw error;
    }
  }

  async getEventAttendees(eventId) {
    try {
      const eventIdBytes = ethers.id(eventId);
      const ticketIds = await this.contract.getEventAttendees(eventIdBytes);
      return ticketIds;
    } catch (error) {
      console.error("Error getting event attendees: ", error.message);
      throw error;
    }
  }

  async getBalance(address) {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error getting balance: ", error.message);
      throw error;
    }
  }
}

export default new BlockchainService();
