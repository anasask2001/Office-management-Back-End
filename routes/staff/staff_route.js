import express from 'express';
import { staffunderintern } from '../../controllers/staff/staff.js';
import { trycatch } from '../../middleware/trycatch.js';
import { seatbooking } from '../../controllers/staff/seat.js';
import { findnotbookedintern } from '../../controllers/staff/Intern.js';
import { verifyStaffToken } from '../../utils/jwt.js';

const route =express.Router();
route.patch("/booking/:staffid/:internid/:seatid",trycatch(seatbooking))
route.get("/:id/intern",trycatch(findnotbookedintern))
route.get('/intern/:id',staffunderintern);

export default route;