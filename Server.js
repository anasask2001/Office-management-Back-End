"use strict";
import express from "express";
import mongoose from "mongoose";
import Dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

import adminroute from "./routes/admin/admin_route.js";
import loginroute from "./routes/common/auth.js";
import staffroute from "./routes/admin/staff_route.js";
import { errorHandler } from "./middleware/error_middleware.js";
import internroute from "./routes/admin/intern_route.js";
import rooms from "./routes/admin/room_route.js";
import seat from "./routes/admin/seat_route.js";
import staff from "./routes/staff/staff_route.js";
import booking from "./routes/staff/booking_route.js";
import payment from "./routes/admin/payment_route.js";

Dotenv.config();

const server = express();



const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

server.use(cors(corsOptions));


server.use(express.json());

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

mongoose
  .connect(process.env.DB, { dbName: "space-management" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
