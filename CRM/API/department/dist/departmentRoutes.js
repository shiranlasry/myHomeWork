"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("../user/middelware/users");
var departmentCont_1 = require("./departmentCont");
var router = express_1["default"].Router();
router
    .post('/add-department', departmentCont_1.createDepartment)
    .get("/get-departments", departmentCont_1.getDepartments)
    .get("/get-departments-by-userId", departmentCont_1.getDepartmentsByUserId)
    .get("/get-department", departmentCont_1.getDepartment)
    .get("/get-department-name", departmentCont_1.getDepartmentName)["delete"]("/delete-department", users_1.isAdmin, departmentCont_1.deleteDepartment)
    .patch("/update-department", users_1.isAdmin, departmentCont_1.updateDepartment);
exports["default"] = router;
