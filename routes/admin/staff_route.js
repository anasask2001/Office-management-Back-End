"use strict";
import express from "express";

import {
  createStaff,
  delete_staff,
  getallstaff,
  Staffcount,
  updatestaff,
} from "../../controllers/admin/staff.js";
import uploadImage from "../../middleware/uploadImg.js";
import { trycatch } from "../../middleware/trycatch.js";
import { verifyAdminToken } from "../../utils/jwt.js";

const route = express.Router();
route.use(verifyAdminToken)
route.post("/", uploadImage, trycatch(createStaff));
route.patch("/:id", uploadImage, trycatch(updatestaff));
route.get("/", trycatch(getallstaff));
route.delete("/:id", trycatch(delete_staff));
route.get("/count", trycatch(Staffcount));

export default route;
