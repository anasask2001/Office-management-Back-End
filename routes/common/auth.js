"use strict";
import express from "express";
import { forgotten, login, updatepass, verifypass } from "../../controllers/common/login.js";
import { trycatch } from "../../middleware/trycatch.js";
import validate from "../../middleware/validate.js";
import { login_validation } from "../../validation/login_validation.js";
import { sendMessaage } from "../../controllers/common/message.js";

const route = express.Router();
route.post("/login", validate(login_validation), trycatch(login));
route.post("/forgotten",trycatch(forgotten))
route.post("/message",trycatch(sendMessaage))
route.post("/verify",trycatch(verifypass))
route.put("/updatepassword",trycatch(updatepass))


export default route;
