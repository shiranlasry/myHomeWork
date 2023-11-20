"use strict";
exports.__esModule = true;
exports.DepartmentModel = exports.DepartmentSchema = void 0;
var mongoose_1 = require("mongoose");
exports.DepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true
    },
    departmentManager: String,
    managerPhoneNum: String
});
//"departments" is the name of the collection in the DB
exports.DepartmentModel = mongoose_1.model("department", exports.DepartmentSchema);
