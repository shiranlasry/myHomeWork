"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateComplainant = exports.deleteComplainant = exports.getComplainantByAddress = exports.getComplainantByPhoneNum = exports.getComplainantById = exports.getComplainants = exports.addNewComplainant = void 0;
var complainantModel_1 = require("./complainantModel");
function addNewComplainant(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, phoneNum, streeComplainant, houseNumComplainant, apartmentNumComplainant, street, houseNum, apartmentNum, complainant, complainantDB, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log('addNewComplainant');
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, phoneNum = _a.phoneNum, streeComplainant = _a.streeComplainant, houseNumComplainant = _a.houseNumComplainant, apartmentNumComplainant = _a.apartmentNumComplainant;
                    street = void 0, houseNum = void 0, apartmentNum = void 0;
                    if (!firstName || !lastName || !phoneNum)
                        throw new Error("Please complete all fields");
                    if (!streeComplainant)
                        street = "";
                    else
                        street = streeComplainant;
                    if (!houseNumComplainant)
                        houseNum = "";
                    else
                        houseNum = houseNumComplainant;
                    if (!apartmentNumComplainant)
                        apartmentNum = "";
                    else
                        apartmentNum = apartmentNumComplainant;
                    console.log(street, houseNum, apartmentNum);
                    complainant = new complainantModel_1.ComplainantModel({ firstName: firstName, lastName: lastName, phoneNum: phoneNum, street: street, houseNum: houseNum, apartmentNum: apartmentNum });
                    return [4 /*yield*/, complainant.save()];
                case 1:
                    complainantDB = _b.sent();
                    console.log(complainantDB);
                    res.send({ ok: true, complainantDB: complainantDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.send({ error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addNewComplainant = addNewComplainant;
function getComplainants(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var complainants, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, complainantModel_1.ComplainantModel.find({})];
                case 1:
                    complainants = _a.sent();
                    res.send({ ok: true, complainants: complainants });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.send({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getComplainants = getComplainants;
function getComplainantById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, complainant, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, complainantModel_1.ComplainantModel.findById(_id)];
                case 1:
                    complainant = _a.sent();
                    if (!complainant)
                        throw new Error("complainant not found");
                    res.send({ ok: true, complainant: complainant });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    res.send({ error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getComplainantById = getComplainantById;
function getComplainantByPhoneNum(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var phoneNum, complainantDB, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('getComplainantByPhoneNum');
                    phoneNum = req.query.phoneNum;
                    return [4 /*yield*/, complainantModel_1.ComplainantModel.findOne({ phoneNum: phoneNum })];
                case 1:
                    complainantDB = _a.sent();
                    if (!complainantDB)
                        throw new Error("complainant not found");
                    // if (complainant.length === 0)  { res.send({ ok: false });}
                    console.log('complainantDB ', complainantDB);
                    res.send({ ok: true, complainantDB: complainantDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.send({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getComplainantByPhoneNum = getComplainantByPhoneNum;
function getComplainantByAddress(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, street, houseNum_1, apartmentNum_1, complainant, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, street = _a.street, houseNum_1 = _a.houseNum, apartmentNum_1 = _a.apartmentNum;
                    if (!street)
                        throw new Error("missing street");
                    return [4 /*yield*/, complainantModel_1.ComplainantModel.find({ street: street })];
                case 1:
                    complainant = _b.sent();
                    if (!complainant)
                        throw new Error("complainant not found");
                    if (houseNum_1) {
                        complainant.filter(function (complainant) { return complainant.houseNum == houseNum_1; });
                    }
                    if (apartmentNum_1) {
                        complainant.filter(function (complainant) { return complainant.apartmentNum == apartmentNum_1; });
                    }
                    res.send({ ok: true, complainant: complainant });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    console.error(error_5);
                    res.send({ error: error_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getComplainantByAddress = getComplainantByAddress;
function deleteComplainant(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, complainant, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, complainantModel_1.ComplainantModel.findByIdAndDelete(_id)];
                case 1:
                    complainant = _a.sent();
                    if (!complainant)
                        throw new Error("complainant not found");
                    res.send({ ok: true, complainant: complainant });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteComplainant = deleteComplainant;
// Define the updateComplainant function
function updateComplainant(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var complainantId, updatedFields, updatedComplainant, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    complainantId = req.body.complainantId;
                    updatedFields = req.body;
                    return [4 /*yield*/, complainantModel_1.ComplainantModel.findByIdAndUpdate(complainantId, updatedFields, { "new": true } // Return the updated document
                        )];
                case 1:
                    updatedComplainant = _a.sent();
                    if (!updatedComplainant) {
                        return [2 /*return*/, res.status(404).json({ message: 'Complainant not found' })];
                    }
                    return [2 /*return*/, res.json({ ok: true, updatedComplainant: updatedComplainant })];
                case 2:
                    error_7 = _a.sent();
                    console.error(error_7);
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateComplainant = updateComplainant;
