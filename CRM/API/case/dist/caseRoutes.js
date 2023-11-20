"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("../user/middelware/users");
var caseCont_1 = require("./caseCont");
var router = express_1["default"].Router();
router
    .post('/add-case', caseCont_1.createCase)
    .get('/get-cases', caseCont_1.getCases)
    .get('/get-case', caseCont_1.getCase)
    .get('/get-cases-by-department', caseCont_1.getCasesByDepartment)
    .get('/get-cases-by-userId', caseCont_1.getCasesByUserId)["delete"]('/delete-case', users_1.isAdmin, caseCont_1.deleteCase)
    .patch('/update-case', caseCont_1.updateCase);
exports["default"] = router;
