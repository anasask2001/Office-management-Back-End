"use strict";
import express from "express";
import { trycatch } from "../../middleware/trycatch.js";
import { createSeats, getallseat } from "../../controllers/admin/seat.js";
import { verifyAdminToken } from "../../utils/jwt.js";

const route = express.Router();
route.post("/seat/:id",verifyAdminToken,trycatch(createSeats));
route.get("/seat",trycatch(getallseat));



export default route;
