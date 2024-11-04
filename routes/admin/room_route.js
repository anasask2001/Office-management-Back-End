"use strict";
import express from "express";
import { trycatch } from "../../middleware/trycatch.js";
import { create_room, get_rooms } from "../../controllers/admin/room.js";
import { verifyAdminToken } from "../../utils/jwt.js";

const route = express.Router();
route.post("/room",verifyAdminToken,trycatch(create_room));
route.get("/room",trycatch(get_rooms));


export default route;
