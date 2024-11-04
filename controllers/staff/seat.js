import { Intern } from "../../models/intern.js";
import { Seat } from "../../models/seat.js";
import { Staff } from "../../models/staff.js";

export const seatbooking = async (req, res) => {
  const { staffid, internid, seatid } = req.params;
  if (!staffid || !internid || !seatid) {
    return res.status(400).json({
      message: "All parameters (staffid, internid, seatid) are required",
    });
  }

  const staff = await Staff.findById(staffid);
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }

  const intern = await Intern.findById(internid);
  if (!intern) {
    return res.status(404).json({ message: "Intern not found" });
  }

  const seat = await Seat.findById(seatid);
  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seat.isReserved) {
    return res.status(400).json({ message: "Seat is already booked" });
  }
  seat.isReserved = true;
  seat.internId = internid;
  seat.staffId = staffid;

  intern.seat = seat._id;
  await intern.save();

  await seat.save();

  return res
    .status(201)
    .json({ message: "Booking created successfully", seat });
};
