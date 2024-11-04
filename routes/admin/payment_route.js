"use strict";
import express from "express";
import { trycatch } from "../../middleware/trycatch.js";
import { payfees } from "../../controllers/admin/fees.js";



const route = express.Router()
route.post("/payment",trycatch(payfees))



export default route