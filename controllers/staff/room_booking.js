import { Room } from "../../models/review_rooms.js";
import cron from "node-cron";

export const bookCabin = async (req, res) => {
  const { staffId, internId, starttime, cabinId } = req.body;

  if (!staffId || !internId || !starttime || !cabinId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const room = await Room.findById(cabinId);
  if (!room) {
    return res.status(404).json({ message: "Cabin not found" });
  }

  const [datePart, timePart] = starttime.split(",");
  const [day, month, year] = datePart.split("/").map(Number);
  const formattedStarttime = new Date(
    year,
    month - 1,
    day,
    ...timePart.trim().split(":").map(Number)
  );

  if (isNaN(formattedStarttime.getTime())) {
    return res.status(400).json({ message: "Invalid start time format" });
  }

  const currentTime = new Date();

  if (formattedStarttime <= currentTime) {
    return res
      .status(400)
      .json({ message: "Cannot book a time slot that has already passed" });
  }

  const bookingHour = formattedStarttime.getHours();
  if (bookingHour < 9 || bookingHour >= 17) {
    return res
      .status(400)
      .json({ message: "Bookings can only be made between 9 AM and 5 PM" });
  }

  const duration = 3600000;
  const endTime = new Date(formattedStarttime.getTime() + duration);

  const existingBooking = room.bookings.find((booking) => {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(bookingStart.getTime() + booking.duration);
    return bookingStart < endTime && bookingEnd > formattedStarttime;
  });

  if (existingBooking) {
    return res
      .status(400)
      .json({ message: "This time slot is already booked" });
  }

  const bookingsForDay = room.bookings.filter((booking) => {
    const bookingDate = new Date(booking.startTime);
    return (
      bookingDate.toDateString() === formattedStarttime.toDateString() &&
      booking.isDelete
    );
  });

  if (bookingsForDay.length >= 8) {
    return res
      .status(400)
      .json({ message: "Maximum booking limit reached for the day" });
  }

  const newBooking = {
    startTime: formattedStarttime.toISOString(),
    duration: duration,
    bookedBy: staffId,
    bookingFor: internId,
    isDelete: true,
  };

  room.bookings.push(newBooking);
  room.availability = false;
  await room.save();

  setTimeout(async () => {
    const updatedRoom = await Room.findById(cabinId);
    const bookingToUpdate = updatedRoom.bookings.find(
      (booking) => booking.startTime === newBooking.startTime
    );

    if (bookingToUpdate && new Date() >= endTime) {
      bookingToUpdate.isDelete = false;
      await updatedRoom.save();
    }
  }, duration);

  return res.status(200).json({
    message: "Cabin booked successfully for 1 hour",
    startTime: formattedStarttime.toISOString(),
  });
};

cron.schedule("*/1 * * * *", async () => {
  const currentTime = new Date();
  const rooms = await Room.find();

  await Promise.all(
    rooms.map(async (room) => {
      room.bookings = room.bookings.filter((booking) => {
        const bookingEndTime =
          new Date(booking.startTime).getTime() + booking.duration;
        const isValid = bookingEndTime > currentTime.getTime();
        if (!isValid) {
          booking.isDelete = true;
        }
        return isValid;
      });

      room.availability = room.bookings.length === 0;

      await room.save();
    })
  );
});

export const bookhistory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "Staff not found" });
  }

  const history = await Room.find({
    bookings: {
      $elemMatch: { bookedBy: id },
    },
  }).select("name bookings.$");

  if (!history.length) {
    return res.status(404).json({ message: "No booking history found" });
  }

  res.status(200).json(history);
};
