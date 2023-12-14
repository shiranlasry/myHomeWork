import express from "express";
import { login, register } from "./usersCtrl";

const router = express.Router();

router
.post("/register", register)
.post("/login", login);
  // "/api/user"


export default router;
