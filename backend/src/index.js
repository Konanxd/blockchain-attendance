import express from "express";
import "dotenv/config.js";
import cors from "cors";
import operatorRoutes from "./routes/operator.route.js";
import publicRoutes from "./routes/public.route.js";
import ticketRoutes from "./routes/ticket.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/operator", operatorRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Network: Sepolia Testnet`);
  console.log(`Contract: ${process.env.CONTRACT_ADDRESS}`);
});
