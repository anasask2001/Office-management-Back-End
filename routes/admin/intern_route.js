"use strict";
import express from "express";
import { trycatch } from "../../middleware/trycatch.js";
import {
  add_intern,
  delete_intern,
  dropInterncount,
  getallintern,
  Interncount,
} from "../../controllers/admin/intern.js";
import uploadImage from "../../middleware/uploadImg.js";
import { verifyAdminToken } from "../../utils/jwt.js";


const route = express.Router();
route.post("/",verifyAdminToken, uploadImage, trycatch(add_intern));
route.get("/",verifyAdminToken, trycatch(getallintern));
route.get("/count",verifyAdminToken, trycatch(Interncount));
route.get("/dropintern/count",verifyAdminToken,trycatch(dropInterncount));
route.delete("/:id",verifyAdminToken,trycatch(delete_intern));

export default route;
