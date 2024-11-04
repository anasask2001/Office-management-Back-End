"use strict";
import express from "express";
import {
  add_role,
  add_stack,
  createAdmin,
  delete_role,
  delete_satck,
  get_role,
  get_satck,
} from "../../controllers/admin/admin.js";
import { trycatch } from "../../middleware/trycatch.js";
import validate from "../../middleware/validate.js";
import { admin_validation } from "../../validation/admin_validation.js";
import {
  add_batch,
  edit_batch_advisor,
  get_advisor,
  get_batch,
  getdatafromid,
} from "../../controllers/admin/common.js";
import { stack_validation } from "../../validation/stack_validation.js";
import { role_validation } from "../../validation/role_validation.js";
import { verifyAdminToken } from "../../utils/jwt.js";

const route = express.Router();

route.post("/admin", validate(admin_validation), trycatch(createAdmin));
route.get("/profile/:id",trycatch(getdatafromid));
route.get("/advisor",verifyAdminToken, trycatch(get_advisor));
route.patch("/batch/:batchId",verifyAdminToken, trycatch(edit_batch_advisor));
route.delete("/role/:adminid",verifyAdminToken, trycatch(delete_role));
route.post("/batch/:adminid",verifyAdminToken, trycatch(add_batch));
route.get("/batch",verifyAdminToken, trycatch(get_batch));
route.patch("/role/:adminid",verifyAdminToken, validate(role_validation), trycatch(add_role));
route.get("/role",verifyAdminToken, trycatch(get_role));
route.delete("/stack/:adminid",verifyAdminToken,trycatch(delete_satck));
route.patch("/stack/:adminid",verifyAdminToken, validate(stack_validation), trycatch(add_stack));
route.get("/stack",verifyAdminToken, trycatch(get_satck));








export default route;
