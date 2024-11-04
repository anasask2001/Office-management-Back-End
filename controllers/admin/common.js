"use strict";
import mongoose from "mongoose";
import { Admin } from "../../models/admin.js";
import { Batch } from "../../models/batch.js";
import { Staff } from "../../models/staff.js";

export const getdatafromid = async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);
  if (admin) {
    return res.status(200).json({ ...admin.toObject(), role: "admin" });
  }

  const staff = await Staff.findById(id);
  if (staff) {
    return res.status(200).json({ ...staff.toObject() });
  }

  return res.status(404).json({ message: "Not found" });
};

export const get_advisor = async (req, res) => {
  const Advisor = await Staff.find({
    batch: { $exists: false },
    role: "Advisor",
    is_delete: false,
  });

  if (Advisor.length > 0) {
    return res.status(200).json(Advisor);
  } else {
    res.status(200).json([]);
  }
};

export const add_batch = async (req, res) => {
  const { adminid } = req.params;
  const { batch_number, advisor } = req.body;

  if (!adminid || !mongoose.Types.ObjectId.isValid(adminid)) {
    return res.status(400).json({ message: "Invalid admin ID." });
  }

  if (!batch_number || !advisor) {
    return res
      .status(400)
      .json({ message: "Batch number and advisor are required." });
  }

  if (!mongoose.Types.ObjectId.isValid(advisor)) {
    return res.status(400).json({ message: "Invalid advisor ID." });
  }

  const staff = await Staff.findById(advisor);
  if (!staff) {
    return res.status(404).json({ message: "Advisor not found." });
  }

  if (staff.batch === batch_number) {
    return res
      .status(400)
      .json({ message: "Batch is already assigned to this advisor." });
  }

  const newBatch = new Batch({
    batch_number,
    advisor,
  });

  await newBatch.save();

  const batchid = await Batch.findOne({ batch_number });


  await Staff.findByIdAndUpdate(advisor, {
    batch: batchid._id,
    batchAssignmentTime: Date.now(),
  });

  return res.status(201).json({
    message: "Batch created and assigned successfully.",
    batch: newBatch,
  });
};

export const get_batch = async (req, res) => {
  const batch = await Batch.find().populate("advisor");
  res.json(batch);
};




export const edit_batch_advisor = async (req, res) => {
  const { batchId } = req.params;
  const { newAdvisor } = req.body;

  

  if (!batchId || !mongoose.Types.ObjectId.isValid(batchId)) {
    return res.status(400).json({ message: "Invalid batch ID." });
  }

  if (!newAdvisor || !mongoose.Types.ObjectId.isValid(newAdvisor)) {
    return res.status(400).json({ message: "Invalid new advisor ID." });
  }

  const batch = await Batch.findById(batchId);
  
  
  if (!batch) {
    return res.status(404).json({ message: "Batch not found." });
  }

  const newAdvisorStaff = await Staff.findById(newAdvisor);
 
  
  if (!newAdvisorStaff) {
    return res.status(404).json({ message: "New advisor not found." });
  }

  const currentAdvisor = await Staff.findById(batch.advisor);
  if (currentAdvisor) {
    await Staff.findByIdAndUpdate(batch.advisor, { $unset: { batch: "" } });
  }

  batch.advisor = newAdvisor;
  
  await batch.save();

  await Staff.findByIdAndUpdate(newAdvisor, { batch:batch._id});

  return res.status(200).json({
    message: "Batch advisor updated successfully.",
    batch,
  });
};
