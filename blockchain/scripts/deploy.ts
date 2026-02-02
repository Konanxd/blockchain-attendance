import { network } from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const { ethers, networkName, networkConfig } = await network.connect();

  console.log("Deploying Attendance contract to Sepolia testnet...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance: ", ethers.formatEther(balance), "ETH");

  const Attendance = await ethers.getContractFactory("Attendance");
  const attendance = await Attendance.deploy();

  await attendance.waitForDeployment();

  await attendance.addOperator(await attendance.owner());

  await attendance.operators(process.env.ADMIN_ADDRESS);

  const address = await attendance.getAddress();
  console.log(`Attendance contract deployed to: ${address}`);

  const code = await ethers.provider.getCode(address);
  if (code === "0x") {
    throw new Error("Contract deployment failed - no code at address");
  }

  const contractInfo = {
    address: address,
    network: networkName,
    chainId: networkConfig.chainId,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
  };

  const outputPath = path.join(__dirname, "../../backend/src/config/contract-address.json");

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {
      recursive: true,
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(contractInfo, null, 2));
  console.log("Contract address saved to:", outputPath);

  console.log("\nDeployment Summary:", contractInfo);

  return contractInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed: ", error);
    process.exit(1);
  });
