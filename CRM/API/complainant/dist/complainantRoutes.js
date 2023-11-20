"use strict";
exports.__esModule = true;
var express_1 = require("express");
var complainantCont_1 = require("./complainantCont");
var router = express_1["default"].Router();
router
    .post("/add-New-complainant", complainantCont_1.addNewComplainant)
    .get("/get-complainants", complainantCont_1.getComplainants)
    .get("/get-complainant-by-id", complainantCont_1.getComplainantById)
    .get("/get-complainant-by-phoneNum", complainantCont_1.getComplainantByPhoneNum)
    .get("/get-complainant-by-address", complainantCont_1.getComplainantByAddress)["delete"]("/delete-complainant", complainantCont_1.deleteComplainant)
    .patch('/update-complainant', complainantCont_1.updateComplainant);
exports["default"] = router;
