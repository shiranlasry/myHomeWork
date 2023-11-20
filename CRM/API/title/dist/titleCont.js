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
exports.updateTitle = exports.deleteTitle = exports.getTitleName = exports.getTitle = exports.getTitles = exports.createTitle = void 0;
var titleModel_1 = require("./titleModel");
function createTitle(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, department, titleDB, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, title = _a.title, department = _a.department;
                    return [4 /*yield*/, titleModel_1.TitleModel.create({ title: title, department: department })];
                case 1:
                    titleDB = _b.sent();
                    res.send({ ok: true, titleDB: titleDB });
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
exports.createTitle = createTitle;
function getTitles(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var department, titles_1, titles, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    department = req.query.department;
                    if (!department) return [3 /*break*/, 2];
                    return [4 /*yield*/, titleModel_1.TitleModel.find({ department: department })];
                case 1:
                    titles_1 = _a.sent();
                    if (!titles_1)
                        throw new Error("No titles");
                    res.send({ ok: true, titles: titles_1 });
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, titleModel_1.TitleModel.find()];
                case 3:
                    titles = _a.sent();
                    if (!titles)
                        throw new Error("No titles");
                    res.send({ ok: true, titles: titles });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    res.send({ error: error_2.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getTitles = getTitles;
function getTitle(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, title, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, titleModel_1.TitleModel.findById(_id)];
                case 1:
                    title = _a.sent();
                    if (!title)
                        throw new Error("Title not found");
                    res.send({ ok: true, title: title });
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
exports.getTitle = getTitle;
function getTitleName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, titleDB, title, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, titleModel_1.TitleModel.findById(_id)];
                case 1:
                    titleDB = _a.sent();
                    if (!titleDB)
                        throw new Error("Title not found");
                    title = titleDB.title;
                    res.send({ ok: true, title: title });
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
exports.getTitleName = getTitleName;
function deleteTitle(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, title, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, titleModel_1.TitleModel.findByIdAndDelete(_id)];
                case 1:
                    title = _a.sent();
                    if (!title)
                        throw new Error("Title not found");
                    res.send({ ok: true });
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
exports.deleteTitle = deleteTitle;
function updateTitle(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, department, _id, existingTitle, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, title = _a.title, department = _a.department, _id = _a._id;
                    return [4 /*yield*/, titleModel_1.TitleModel.findById(_id)];
                case 1:
                    existingTitle = _b.sent();
                    if (!existingTitle)
                        throw new Error("Title not found");
                    if (title !== existingTitle.title)
                        existingTitle.title = title;
                    if (department !== existingTitle.department)
                        existingTitle.department = department;
                    return [4 /*yield*/, existingTitle.save()];
                case 2:
                    _b.sent();
                    res.send({ ok: true });
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    console.error(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateTitle = updateTitle;
