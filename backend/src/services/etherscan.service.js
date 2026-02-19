import "dotenv/config.js";
import axios from "axios"

const API_KEY = process.env.ETHERSCAN_API_KEY;
const BASE_URL = process.env.ETHERSCAN_BASE_URL;

if (!API_KEY) {
  throw new Error("Etherscan ENV not configured");
}

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

class EtherscanService {
  async getTransactionByHash(txHash) {
    const {data} = await client.get("", {
      params: {
        module: "proxy",
        action: "eth_getTransactionByHash",
        txhash: txHash,
        apiKey: API_KEY
      }
    });

    console.log(data)
    if (!data.result) {
      throw new Error("Transaction not found");
    }

    return data;
  }

  async getTransactionReceipt(txHash) {
    const {data} = await client.get("", {
      params: {
        module: "proxy",
        action: "eth_getTransactionReceipt",
        txhash: txHash,
        apiKey: API_KEY
      }
    });
    
    if (!data.result) {
      throw new Error("Transaction receipt not found");
    }

    return data;
  }

  async getTransactionByAddress(address) {
    const {data} = await client.get("", {
      params: {
        module: "proxy",
        action: "txlist",
        address,
        startblock: 0,
        endblock: 99999999,
        sort: "desc",
        apiKey: API_KEY
      }
    });

    if (data.status !== 1) {
      throw new Error(data.message | "Failed to address transactions");
    }

    return data;
  }
}

export default new EtherscanService();
