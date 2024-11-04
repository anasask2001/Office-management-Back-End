import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  row: {
    type: String,
    required: true,
    enum: [
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
    ],
  },
  number: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  isReserved: {
    type: Boolean,
    default: false,
  },

  internId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Intern",
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
  reservationDate: {
    type: Date,
    default: Date.now,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Seat = mongoose.model("Seat", seatSchema);

export { Seat };
