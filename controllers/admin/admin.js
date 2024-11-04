"use strict";
import mongoose from "mongoose";
import { Admin } from "../../models/admin.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingadmin = await Admin.findOne({ email });
  if (existingadmin) {
    return res
      .status(409)
      .json({ message: "Admin with this email already exists" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newadmin = new Admin({ name, email, password: hashedPassword });

  await newadmin.save();

  return res
    .status(201)
    .json({ message: "Admin created successfully", admin: newadmin });
};

export const add_stack = async (req, res) => {
  const { adminid } = req.params;
  const { stack } = req.body;

  if (!mongoose.isValidObjectId(adminid)) {
    return res.status(400).json({ message: "Invalid Admin ID format!" });
  }

  if (!stack) {
    return res.status(400).json({ message: "Stack is required!" });
  }

  const admin = await Admin.findById(adminid);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  const formattedStack =
    stack.charAt(0).toUpperCase() + stack.slice(1).toLowerCase();

  const exists = admin.stack.some(
    (existingStack) =>
      existingStack.toLowerCase() === formattedStack.toLowerCase()
  );

  if (exists) {
    return res.status(200).json({ message: "Stack already exists!" });
  }

  const result = await Admin.updateOne(
    { _id: adminid },
    { $push: { stack: formattedStack } }
  );

  if (result.modifiedCount === 0) {
    return res
      .status(400)
      .json({ message: "No changes made or stack already exists!" });
  }

  return res.status(200).json({ message: "Stack added successfully!" });
};

export const get_satck = async (req, res) => {
  const admin = await Admin.find();
  const stack = admin.flatMap((admin) => admin.stack);
  res.json(stack);
};

export const delete_satck = async (req, res) => {
  const { adminid } = req.params;
  const { stack } = req.body;

  if (!mongoose.isValidObjectId(adminid)) {
    return res.status(400).json({ message: "Invalid Admin ID format!" });
  }

  if (!stack) {
    return res.status(400).json({ message: "Stack is required!" });
  }

  const admin = await Admin.findById(adminid);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  if (!admin.stack.includes(stack)) {
    return res.status(404).json({ message: "Stack not found!" });
  }
  const result = await Admin.updateOne(
    { _id: adminid },
    { $pull: { stack: stack } }
  );
  if (result.modifiedCount === 0) {
    return res.status(400).json({ message: "Failed to delete the batch!" });
  }

  return res.status(200).json({ message: "Stack deleted successfully!" });
};

export const add_role = async (req, res) => {
  const { adminid } = req.params;
  const { roles } = req.body;


  if (!mongoose.isValidObjectId(adminid)) {
    return res.status(400).json({ message: "Invalid Admin ID format!" });
  }

  if (!roles) {
    return res.status(400).json({ message: "Role is required!" });
  }

  const admin = await Admin.findById(adminid);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  const formattedrole =
    roles.charAt(0).toUpperCase() + roles.slice(1).toLowerCase();

  const exists = admin.roles.some(
    (existingrole) => existingrole.toLowerCase() === formattedrole.toLowerCase()
  );

  if (exists) {
    return res.status(200).json({ message: "Role already exists!" });
  }

  const result = await Admin.updateOne(
    { _id: adminid },
    { $push: { roles: formattedrole } }
  );

  if (result.modifiedCount === 0) {
    return res
      .status(400)
      .json({ message: "No changes made or Role already exists!" });
  }

  return res.status(200).json({ message: "Role added successfully!" });
};

export const get_role = async (req, res) => {
  const admin = await Admin.find();
  const roles = admin.flatMap((admin) => admin.roles);
  res.json(roles);
};

export const delete_role = async (req, res) => {
  const { adminid } = req.params;
  const { roles } = req.body;

  if (!mongoose.isValidObjectId(adminid)) {
    return res.status(400).json({ message: "Invalid Admin ID format!" });
  }

  if (!roles) {
    return res.status(400).json({ message: "Role is required!" });
  }

  const admin = await Admin.findById(adminid);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  if (!admin.roles.includes(roles)) {
    return res.status(404).json({ message: "Role not found!" });
  }
  const result = await Admin.updateOne(
    { _id: adminid },
    { $pull: { roles: roles } }
  );
  if (result.modifiedCount === 0) {
    return res.status(400).json({ message: "Failed to delete the Role!" });
  }

  return res.status(200).json({ message: "Role deleted successfully!" });
};
