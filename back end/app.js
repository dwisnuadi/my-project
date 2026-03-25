import express from "express";
import authRouter from "./routes/authRoutes.js";

const app = express();

// 🌟 Middleware JSON
app.use(express.json());
app.use("/api/auth", authRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));