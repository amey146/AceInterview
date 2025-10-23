import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import progressRoutes from "./routes/progressRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/log", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
