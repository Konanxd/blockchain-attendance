import { Router } from "express";
import {fetchTransaction} from "../controllers/etherscan.controller.js"

const router = Router();

router.get("/tx/:txHash", fetchTransaction);

export default router;
