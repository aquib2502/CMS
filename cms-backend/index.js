import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"
import uploadRoutes from "./routes/uploadRoutes.js"


dotenv.config();

const app = express();
app.use(cors())

// Middleware
app.use(express.json()); // Parse JSON body

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

  app.use("/uploads", express.static("uploads"));


// Routes
app.use("/", authRoutes);

//upload routes
app.use(uploadRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
