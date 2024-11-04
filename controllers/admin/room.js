"use strict";
import { Room } from "../../models/review_rooms.js";

export const create_room = async (req, res) => {
  const { name, capacity, type } = req.body;

  if (!name || !capacity || !type) {
    return res.status(400).json({
      message: "Please provide all required fields: name, capacity, and type.",
    });
  }

  const existingRoom = await Room.findOne({ name });
  if (existingRoom) {
    return res.status(400).json({
      message:
        "A room with this name already exists. Please choose a different name.",
    });
  }

  if (capacity <= 0) {
    return res
      .status(400)
      .json({ message: "Capacity must be a positive number." });
  }

  const newRoom = new Room({
    name,
    capacity,
    type,
  });

  await newRoom.save();

  return res.status(201).json({
    message: "Room created successfully",
    room: newRoom,
  });
};

export const get_rooms = async (req, res) => {
  const rooms = await Room.find();

  if (rooms.length > 0) {
    return res.status(200).json(rooms);
  } else {
    res.status(200).json({ message: [] });
  }
};

/*

   {
      status: "success || failure",
      message: "successfully fetched user data",
      status_code: 200,
      error_message: null,
   }
  */
