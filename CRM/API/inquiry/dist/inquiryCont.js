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
exports.updateInquiry = exports.deleteInquiry = exports.getInquiry = exports.getInquiries = exports.createInquiry = void 0;
var inquiryModel_1 = require("./inquiryModel");
function createInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userCreatorId, title, streetCase, streetNumberCase, description, recivedDate, status, closedDate, department, priority, solution, inquiry, inquiryDB, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, userCreatorId = _a.userCreatorId, title = _a.title, streetCase = _a.streetCase, streetNumberCase = _a.streetNumberCase, description = _a.description, recivedDate = _a.recivedDate, status = _a.status, closedDate = _a.closedDate, department = _a.department, priority = _a.priority, solution = _a.solution;
                    inquiry = new inquiryModel_1.InquiryModel({ userCreatorId: userCreatorId, department: department, title: title, street: streetCase, streetNumber: streetNumberCase, description: description, recivedDate: recivedDate, status: status, closedDate: closedDate, priority: priority, solution: solution });
                    return [4 /*yield*/, inquiry.save()];
                case 1:
                    inquiryDB = _b.sent();
                    res.send({ ok: true, inquiryDB: inquiryDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createInquiry = createInquiry;
function getInquiries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var inquiries, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, inquiryModel_1.InquiryModel.find({})];
                case 1:
                    inquiries = _a.sent();
                    if (!inquiries)
                        throw new Error("No inquiries");
                    res.send({ ok: true, inquiries: inquiries });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getInquiries = getInquiries;
function getInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, inquiry, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, inquiryModel_1.InquiryModel.findById(_id)];
                case 1:
                    inquiry = _a.sent();
                    if (!inquiry)
                        throw new Error("Inquiry not found");
                    res.send({ ok: true, inquiry: inquiry });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getInquiry = getInquiry;
function deleteInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, inquiry, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, inquiryModel_1.InquiryModel.findByIdAndDelete(_id)];
                case 1:
                    inquiry = _a.sent();
                    if (!inquiry)
                        throw new Error("Inquiry not found");
                    res.send({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteInquiry = deleteInquiry;
function updateInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, description, status, solution, street, streetNumber, _id, existingInquiry, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    console.log("updateInquiry");
                    _a = req.body, description = _a.description, status = _a.status, solution = _a.solution, street = _a.street, streetNumber = _a.streetNumber, _id = _a._id;
                    return [4 /*yield*/, inquiryModel_1.InquiryModel.findById(_id)];
                case 1:
                    existingInquiry = _b.sent();
                    if (!existingInquiry)
                        throw new Error("Inquiry not found");
                    console.log(existingInquiry);
                    if ((description !== existingInquiry.description) && description)
                        existingInquiry.description = description;
                    if ((status !== existingInquiry.status) && status)
                        existingInquiry.status = status;
                    //if status is closed, set closedDate
                    if (status === "closed")
                        existingInquiry.closedDate = new Date();
                    if ((solution !== existingInquiry.solution) && solution)
                        existingInquiry.solution = solution;
                    if ((street !== existingInquiry.street) && street)
                        existingInquiry.street = street;
                    if ((streetNumber !== existingInquiry.streetNumber) && streetNumber)
                        existingInquiry.streetNumber = streetNumber;
                    return [4 /*yield*/, existingInquiry.save()];
                case 2:
                    _b.sent();
                    console.log(existingInquiry);
                    res.send({ ok: true, existingInquiry: existingInquiry });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateInquiry = updateInquiry;
