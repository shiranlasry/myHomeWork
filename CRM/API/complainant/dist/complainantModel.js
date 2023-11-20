"use strict";
exports.__esModule = true;
exports.ComplainantModel = exports.ComplainantSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ComplainantSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true
    },
    street: {
        type: String,
        required: false,
        unique: false
    },
    houseNum: {
        type: String,
        required: false,
        unique: false
    },
    apartmentNum: {
        type: String,
        required: false,
        unique: false
    }
});
//"complainants" is the name of the collection in the DB
exports.ComplainantModel = mongoose_1.model("complainants", exports.ComplainantSchema);
