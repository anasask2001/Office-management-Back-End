import { Admin } from "../../models/admin.js";
import { Seat } from "../../models/seat.js";

export const createSeats = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Admin ID is required." });
  }

  const admin = await Admin.findById(id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found." });
  }

  const validRows = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
  ];
  const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  for (let row of validRows) {
    for (let number of validNumbers) {
      const existingSeat = await Seat.findOne({ row, number });
      if (existingSeat) {
        continue;
      }

      const newSeat = new Seat({
        row,
        number,
      });

      await newSeat.save();
    }
  }

  return res.status(201).json({
    message: "Seats created successfully.",
  });
};

export const getallseat = async (req, res) => {
  try {
    const seats = await Seat.find({ isAvailable: true })
      .populate('internId') 
      .populate('staffId')
      .populate({
        path: 'staffId',
        populate: {
          path: 'batch',
        },
      });



    return res.status(200).json(seats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching seats" });
  }
};

