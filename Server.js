"use strict";
import express from "express";
import mongoose from "mongoose";
import Dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

// Importing routes with corrected paths
import adminroute from "./routes/admin/admin_route.js";
import loginroute from "./routes/common/auth.js";
import staffroute from "./routes/admin/staff_route.js";
import { errorHandler } from "./middleware/error_middleware.js";
import internroute from "./routes/admin/intern_route.js";
import rooms from "./routes/admin/room_route.js"; // Corrected path to be relative
import seat from "./routes/admin/seat_route.js";
import staff from "./routes/staff/staff_route.js";
import booking from "./routes/staff/booking_route.js";
import payment from "./routes/admin/payment_route.js";

// Load environment variables
Dotenv.config();

// Initialize express server
const server = express();
const upload = multer();

// Middleware
server.use(express.json());
server.use(cors());

// Define routes
server.use("/api/admin", adminroute);
server.use("/api", payment);
server.use("/api", loginroute);
server.use("/api/admin/staff", staffroute);
server.use("/api/admin/intern", internroute);
server.use("/api/admin", rooms);
server.use("/api/admin", seat);
server.use("/api/staff", staff);
server.use("/api/staff", booking);
server.use(errorHandler);

// Bind to the PORT environment variable for Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB, { dbName: "space-management" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));



// server.use(
//   cors({
//     origin: "https://space-management.vercel.app",
//   })
// );

