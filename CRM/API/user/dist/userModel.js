"use strict";
exports.__esModule = true;
exports.UserModel = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    phoneNum: String,
    role: {
        type: String,
        "enum": ["admin", "user"],
        "default": "user"
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'DepartmentModel',
        required: true
    }
});
//"users" is the name of the collection in the DB
exports.UserModel = mongoose_1.model("CRMuser", exports.UserSchema);
