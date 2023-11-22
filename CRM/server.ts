//server

import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { getLoggedUser } from "./API/user/middelware/users"

//npm i dotenv
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

//static files
app.use(express.static("public"));


//body
app.use(express.json());

const { MONGO_URI } = process.env;
// for req loged in user detalis
//connect to mongoDB with mongoose
mongoose.connect(MONGO_URI)
  .then(() => {
    console.info("MongoDB connected")
  })
  .catch(err => {
    console.error(err)
  })

app.use(getLoggedUser);

import userRoutes from "./API/user/userRoutes"
app.use("/API/user", userRoutes);

import departmentRoutes from "./API/department/departmentRoutes"
app.use("/API/department", departmentRoutes);

import inquiryRoutes from "./API/inquiry/inquiryRoutes"
app.use("/API/inquiry", inquiryRoutes);

import caseRoutes from "./API/case/caseRoutes"
app.use("/API/case", caseRoutes);

import titleRoutes from "./API/title/titleRoutes"
app.use("/API/title", titleRoutes);

import complainantRoutes from "./API/complainant/complainantRoutes"
app.use("/API/complainant", complainantRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

