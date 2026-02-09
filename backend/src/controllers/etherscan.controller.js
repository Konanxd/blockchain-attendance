import etherscanService from "../services/etherscan.service.js"
import {Interface} from "ethers";
import attendanceAbi from "../../abi/Attendance.json" with {type: "json"};
import serializerBigInt from "../utils/serializerBigInt.js"

const iface = new Interface(attendanceAbi.abi);

export const fetchTransaction = async (req, res) => {
  try {
    const {txHash} = req.params;
    const tx = await etherscanService.getTransactionByHash(txHash);
    
    const decoded = iface.parseTransaction({
      data: tx.result.input,
    });

    return res.json(
      serializerBigInt(decoded)
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


