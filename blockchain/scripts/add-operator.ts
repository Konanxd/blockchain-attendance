import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import "dotenv/config.js";

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

  const ownerWallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);

  const artifactPath = path.join(
    process.cwd(),
    "artifacts/contracts/Attendance.sol/Attendance.json",
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, artifact.abi, ownerWallet);

  const owner = await contract.owner();
  console.log("Contract Owner: ", owner);

  const operatorAddress = process.env.OWNER_ADDRESS;
  console.log("Wallet Address: ", operatorAddress);

  if (owner == operatorAddress) {
    console.log("Match");
  } else {
    console.log("Not match");
  }

  console.log("Adding operator: ", operatorAddress);

  const tx = await contract.addOperator(operatorAddress);
  await tx.wait();

  console.log("Operator added successfully");
}

main().catch(console.error);
