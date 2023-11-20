"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("../user/middelware/users");
var inquiryCont_1 = require("./inquiryCont");
var router = express_1["default"].Router();
router
    .post('/add-inquiry', inquiryCont_1.createInquiry)
    .get("/get-inquiries", inquiryCont_1.getInquiries)
    .get("/get-inquiry", inquiryCont_1.getInquiry)["delete"]("/delete-inquiry", users_1.isAdmin, inquiryCont_1.deleteInquiry)
    .patch("/update-inquiry", inquiryCont_1.updateInquiry);
exports["default"] = router;
