"use strict";
exports.__esModule = true;
exports.InquiryModel = exports.InquirySchema = void 0;
var mongoose_1 = require("mongoose");
exports.InquirySchema = new mongoose_1.Schema({
    userCreatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'DepartmentModel',
        required: true
    },
    title: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'TitleSchema',
        required: true
    },
    street: {
        type: String,
        "default": ""
    },
    streetNumber: {
        type: Number,
        "default": ""
    },
    description: String,
    recivedDate: Date,
    status: {
        type: String,
        "enum": ["open", "closed", "inProgress"],
        "default": "open"
    },
    closedDate: {
        type: Date,
        "default": null
    },
    priority: {
        type: String,
        "enum": ["low", "medium", "high"],
        "default": "low"
    },
    solution: {
        type: String,
        "default": null
    }
});
//"inquiries" is the name of the collection in the DB
exports.InquiryModel = mongoose_1.model("inquiry", exports.InquirySchema);
