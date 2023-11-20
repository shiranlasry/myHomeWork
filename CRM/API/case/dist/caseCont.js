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
exports.updateCase = exports.deleteCase = exports.getCase = exports.getCasesByDepartment = exports.getCasesByUserId = exports.getCases = exports.createCase = void 0;
var caseModel_1 = require("./caseModel");
function createCase(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, inquiry, departmentId, userId, complainantId, lastCase, nextOrderNumber, newCase, caseDB, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, inquiry = _a.inquiry, departmentId = _a.departmentId, userId = _a.userId, complainantId = _a.complainantId;
                    if (!inquiry || !departmentId || !userId || !complainantId)
                        throw new Error("missing required fields");
                    return [4 /*yield*/, caseModel_1.CaseModel.findOne({}, {}, { sort: { orderNumber: -1 } })];
                case 1:
                    lastCase = _b.sent();
                    nextOrderNumber = lastCase ? lastCase.orderNumber + 1 : 1000;
                    newCase = new caseModel_1.CaseModel({ inquiry: inquiry, departmentId: departmentId, userId: userId, complainantId: complainantId, orderNumber: nextOrderNumber });
                    return [4 /*yield*/, newCase.save()];
                case 2:
                    caseDB = _b.sent();
                    res.send({ ok: true, caseDB: caseDB });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createCase = createCase;
function getCases(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cases, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("getCases");
                    return [4 /*yield*/, caseModel_1.CaseModel.find()];
                case 1:
                    cases = _a.sent();
                    if (!cases)
                        throw new Error("cases not found");
                    res.send({ ok: true, cases: cases });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    res.send({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCases = getCases;
function getCasesByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, cases, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("getCasesByUserId");
                    userId = req.query.userId;
                    return [4 /*yield*/, caseModel_1.CaseModel.find({ userId: userId })];
                case 1:
                    cases = _a.sent();
                    if (!cases)
                        throw new Error("cases not found");
                    res.send({ ok: true, cases: cases });
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
exports.getCasesByUserId = getCasesByUserId;
function getCasesByDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, cases, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    departmentId = req.query.departmentId;
                    return [4 /*yield*/, caseModel_1.CaseModel.find({ departmentId: departmentId })];
                case 1:
                    cases = _a.sent();
                    if (!cases)
                        throw new Error("cases not found");
                    res.send({ ok: true, cases: cases });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    res.send({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCasesByDepartment = getCasesByDepartment;
function getCase(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, caseDB, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("getCase");
                    _id = req.query._id;
                    return [4 /*yield*/, caseModel_1.CaseModel.findById(_id)];
                case 1:
                    caseDB = _a.sent();
                    if (!caseDB)
                        throw new Error("case not found");
                    res.send({ ok: true, caseDB: caseDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    res.send({ error: error_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCase = getCase;
function deleteCase(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, caseDB, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, caseModel_1.CaseModel.findByIdAndDelete(_id)];
                case 1:
                    caseDB = _a.sent();
                    if (!caseDB)
                        throw new Error("case not found");
                    res.send({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error(error_6);
                    res.send({ error: error_6.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCase = deleteCase;
function updateCase(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, inquiry, userId, case_id, updatedCase, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log("updateCase");
                    _a = req.body, inquiry = _a.inquiry, userId = _a.userId, case_id = _a.case_id;
                    if (!inquiry || !userId || !case_id)
                        throw new Error("missing required fields");
                    console.log("inquiry: ", inquiry);
                    return [4 /*yield*/, caseModel_1.CaseModel.findById(case_id)];
                case 1:
                    updatedCase = _b.sent();
                    updatedCase.inquiry = inquiry;
                    updatedCase.userId = userId;
                    updatedCase.save();
                    res.send({ ok: true, updatedCase: updatedCase });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    console.error(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateCase = updateCase;
