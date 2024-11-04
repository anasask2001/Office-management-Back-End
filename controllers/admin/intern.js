import { Intern } from "../../models/intern.js";
import { Batch } from "../../models/batch.js";
import dotenv from "dotenv";

dotenv.config();

export const add_intern = async (req, res) => {
  const { firstname, lastname, email, phonenumber, stack, batch } = req.body;

  if (!firstname || !lastname || !email || !phonenumber || !stack || !batch) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingintern = await Intern.findOne({ email });
  if (existingintern) {
    return res.status(409).json({ message: "You're already registered" });
  }

  const assignedBatch = await Batch.findById(batch).populate("advisor");

  if (!assignedBatch) {
    return res.status(404).json({ message: "Batch not found" });
  }

  const assignedAdvisor = assignedBatch.advisor;
  if (!assignedAdvisor) {
    return res
      .status(404)
      .json({ message: "No advisor assigned to this batch" });
  }

  const newintern = new Intern({
    firstname,
    lastname,
    email,
    phonenumber,
    stack,
    batch,
    profileImg: req.cloudinaryImageUrl,
  });

  await newintern.save();
  return res.status(201).json({ message: "intern added successfully" });
};

export const getallintern = async (req, res) => {
  const interns = await Intern.find({ is_delete: false }).populate({
    path: "batch",
    populate: {
      path: "advisor",
    },
  });

  if (interns.length > 0) {
    return res.status(200).json(interns);
  } else {
    return res.status(200).json([]);
  }
};

export const Interncount = async (req, res) => {
  const count = await Intern.countDocuments({ is_delete: false });
  return res.status(200).json(count);
};

export const dropInterncount = async (req, res) => {
  const count = await Intern.countDocuments({ is_delete: true });
  return res.status(200).json(count);
};

export const delete_intern = async (req, res) => {
  const id = req.params.id;
  const deleteintern = await Intern.findById(id);
  if (!deleteintern) {
    return res.status(404).json({ message: "Staff not found" });
  }

  deleteintern.is_delete = true;
  await deleteintern.save();
  return res
    .status(200)
    .json({ message: "staff deleted sucessfully", deleteintern });
};
