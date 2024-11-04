"use strict";
import bcrypt from "bcrypt";
import { Admin } from "../../models/admin.js";
import { genarate_admin_token, genarate_staff_token } from "../../utils/jwt.js";
import { Staff } from "../../models/staff.js";
import generateOtp from "../../utils/otp.js";
import transport from "../../config/nodemailer.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const admin = await Admin.findOne({ email });
  const staff = await Staff.findOne({ email });

  if (admin) {
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = genarate_admin_token(admin);

    return res
      .status(200)
      .json({ message: "Logged in successfully", token, role: "admin" });
  } else if (staff) {
    const isPasswordCorrect = await bcrypt.compare(password, staff.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = genarate_staff_token(staff);

    return res
      .status(200)
      .json({ message: "Logged in successfully", token, role: "staff" });
  } else {
    return res.status(404).json({ message: "user not found" });
  }
};

const otpStore = {};

export const forgotten = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const staffMember = await Staff.findOne({ email, is_delete: false });

  if (!staffMember) {
    return res.status(404).json({ message: "Email not found" });
  }

  const otp = generateOtp();
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    staffId: staffMember._id,
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h4>Hello ${staffMember.firstname} ${staffMember.lastname},</h4>
      <p>We received a request to reset the password for your account.</p>
      <p>Please use the following OTP to reset your password:</p>
      <h3>OTP: ${otp}</h3>
      <p><em>Note: This OTP will expire in 5 minutes.</em></p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <br>
      <p>Best regards,</p>
      <p>[Your Company Name or Support Team]</p>
    `,
  };

  await transport.sendMail(mailOptions);
  return res.status(200).json({ message: "OTP sent successfully" });
};

export const verifypass = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  const email = Object.keys(otpStore).find((key) => otpStore[key].otp === otp);

  if (!email) {
    return res.status(404).json({ message: "OTP not found" })
  }

  const { expiresAt } = otpStore[email];

  if (Date.now() > expiresAt) {
    delete otpStore[email];
    return res.status(410).json({ message: "OTP expired" })
  }

  return res.status(200).json({ message: "OTP verified successfully" })
};

export const updatepass = async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "New  password  required" });
  }

  const email = Object.keys(otpStore).find((key) => otpStore[key].otp);

  if (!email) {
    return res
      .status(404)
      .json({ message: "Email not found or OTP not verified" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await Staff.updateOne(
    { _id: otpStore[email].staffId },
    { password: hashedPassword }
  );

  delete otpStore[email];

  return res.status(200).json({ message: "Password updated successfully" });
};
