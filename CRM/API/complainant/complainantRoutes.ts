import express from "express";
import { addNewComplainant,updateComplainant , deleteComplainant, getComplainantByAddress, getComplainantById, getComplainantByPhoneNum, getComplainants } from "./complainantCont";
import { get } from "mongoose";

const router = express.Router();

router
    .post("/add-New-complainant", addNewComplainant)
    .get("/get-complainants", getComplainants)
    .get("/get-complainant-by-id", getComplainantById)
    .get("/get-complainant-by-phoneNum", getComplainantByPhoneNum)
    .get("/get-complainant-by-address", getComplainantByAddress)
    .delete("/delete-complainant", deleteComplainant)
    .patch('/update-complainant', updateComplainant);
   
export default router;