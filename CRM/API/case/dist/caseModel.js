"use strict";
exports.__esModule = true;
exports.CaseModel = exports.CaseSchema = void 0;
var mongoose_1 = require("mongoose");
var inquiryModel_1 = require("../inquiry/inquiryModel");
exports.CaseSchema = new mongoose_1.Schema({
    orderNumber: {
        type: Number,
        unique: true,
        required: true,
        "default": 1000 // Starting order number
    },
    inquiry: inquiryModel_1.InquirySchema,
    departmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'DepartmentModel',
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    complainantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ComplainantModel',
        required: true
    }
});
//"cases" is the name of the collection in the DB
exports.CaseModel = mongoose_1.model("case", exports.CaseSchema);
