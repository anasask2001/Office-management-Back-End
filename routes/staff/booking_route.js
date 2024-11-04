import express from "express"
import { trycatch } from "../../middleware/trycatch.js"
import { bookCabin, bookhistory } from "../../controllers/staff/room_booking.js"
import { verifyStaffToken } from "../../utils/jwt.js"


const route = express.Router()
route.post("/booking",trycatch(bookCabin))
route.get("/:id/history",trycatch(bookhistory))


export default route