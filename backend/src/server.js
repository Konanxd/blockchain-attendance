import app from "./index.js";
import ticketRoutes from "./routes/ticket.routes.js"

app.use("/tickets", ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Network: Sepolia Testnet`);
  console.log(`Contract: ${process.env.CONTRACT_ADDRESS}`);
});
