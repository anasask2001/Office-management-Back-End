"use strict";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const admin_secret = process.env.admin_secret_key || "12345abcd";
const staff_secret = process.env.staff_secret_key || "abcd12345";

const genarate_admin_token = (admin) => {
  return jwt.sign({ id: admin._id, role: "admin" }, admin_secret, {
    expiresIn: "1h",
  });
};
const genarate_staff_token = (staff) => {
  return jwt.sign({ id: staff._id, role: "Advisor" }, staff_secret, {
    expiresIn: "1h",
  });
};


const verifyAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    jwt.verify(token, admin_secret, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden - Invalid or expired token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error verifying Staff token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const verifyStaffToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.startsWith("Bearer")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    jwt.verify(token, staff_secret, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden - Invalid or expired token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error verifying Staff token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  genarate_admin_token,
  genarate_staff_token,
  verifyAdminToken,
  verifyStaffToken,
};
