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
exports.updateDepartment = exports.deleteDepartment = exports.getDepartmentName = exports.getDepartment = exports.getDepartmentsByUserId = exports.getDepartments = exports.createDepartment = void 0;
var departmentModel_1 = require("./departmentModel");
function createDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, phoneNum, departmentManager, managerPhoneNum, department, departmentDB, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name = _a.name, phoneNum = _a.phoneNum, departmentManager = _a.departmentManager, managerPhoneNum = _a.managerPhoneNum;
                    if (!name || !phoneNum || !departmentManager || !managerPhoneNum)
                        throw new Error("missing required fields");
                    department = new departmentModel_1.DepartmentModel({ name: name, phoneNum: phoneNum, departmentManager: departmentManager, managerPhoneNum: managerPhoneNum });
                    return [4 /*yield*/, department.save()];
                case 1:
                    departmentDB = _b.sent();
                    res.send({ ok: true, departmentDB: departmentDB });
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
exports.createDepartment = createDepartment;
function getDepartments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departments, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.find()];
                case 1:
                    departments = _a.sent();
                    res.send({ ok: true, departments: departments });
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
exports.getDepartments = getDepartments;
function getDepartmentsByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, department, departments, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    departmentId = req.query.departmentId;
                    if (!departmentId)
                        throw new Error("missing required fields");
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.findById({ _id: departmentId })];
                case 1:
                    department = _a.sent();
                    if (!department)
                        throw new Error("department not found");
                    if (!(department.name == 'Moked')) return [3 /*break*/, 3];
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.find()];
                case 2:
                    departments = _a.sent();
                    res.send({ ok: true, departments: departments });
                    return [3 /*break*/, 4];
                case 3:
                    res.send({ ok: true, departments: [department] });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error(error_3);
                    res.send({ error: error_3.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getDepartmentsByUserId = getDepartmentsByUserId;
function getDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, department, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.findById(_id)];
                case 1:
                    department = _a.sent();
                    if (!department)
                        throw new Error("department not found");
                    res.send({ ok: true, department: department });
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
exports.getDepartment = getDepartment;
function getDepartmentName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, department, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.findById(_id)];
                case 1:
                    department = _a.sent();
                    if (!department)
                        throw new Error("department not found");
                    res.send({ ok: true, departmentName: department.name });
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
exports.getDepartmentName = getDepartmentName;
function deleteDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, department, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.findByIdAndDelete(_id)];
                case 1:
                    department = _a.sent();
                    if (!department)
                        throw new Error("department not found");
                    res.send({ ok: true, department: department });
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
exports.deleteDepartment = deleteDepartment;
function updateDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, phoneNum, departmentManager, managerPhoneNum, _id, existingDepartment, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name = _a.name, phoneNum = _a.phoneNum, departmentManager = _a.departmentManager, managerPhoneNum = _a.managerPhoneNum, _id = _a._id;
                    return [4 /*yield*/, departmentModel_1.DepartmentModel.findById(_id)];
                case 1:
                    existingDepartment = _b.sent();
                    if (!existingDepartment)
                        throw new Error("department not found");
                    if (name !== existingDepartment.name)
                        existingDepartment.name = name;
                    if (phoneNum !== existingDepartment.phoneNum)
                        existingDepartment.phoneNum = phoneNum;
                    if (departmentManager !== existingDepartment.departmentManager)
                        existingDepartment.departmentManager = departmentManager;
                    if (managerPhoneNum !== existingDepartment.managerPhoneNum)
                        existingDepartment.managerPhoneNum = managerPhoneNum;
                    return [4 /*yield*/, existingDepartment.save()];
                case 2:
                    _b.sent();
                    res.send({ ok: true });
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _b.sent();
                    console.error(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateDepartment = updateDepartment;
