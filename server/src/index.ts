import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import designRoutes from "./routes/designs";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/tailwind-design-console";

app.use(
    origin: [
      "http://localhost:5173",
      "https://tailwind-shikho-react-redux.vercel.app",
      process.env.CLIENT_URL || "",
    ],
);
app.use(express.json());
app.use(cookieParser());

// Root Route (Health Check)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api/designs", designRoutes);
app.use("/api/auth", authRoutes);

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
