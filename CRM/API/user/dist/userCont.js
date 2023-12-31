"use strict";
//user controler
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
exports.getUsersByDepartment = exports.updatePersonalInfo = exports.updatePassword = exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.getLoggedUserDB = exports.LogOutCockie = exports.login = exports.registerUser = void 0;
var userModel_1 = require("./userModel");
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var secret = process.env.SECRET;
var saltRounds = 10;
//register user 
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, email, password, phoneNum, role, department, hash, user, userDB, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, phoneNum = _a.phoneNum, role = _a.role, department = _a.department;
                    // console.log(`${firstName} ${lastName} ${email} ${role} ${department}`)
                    if (!email || !password || !firstName || !lastName || !phoneNum || !role || !department)
                        throw new Error("Please complete all fields");
                    return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
                case 1:
                    hash = _b.sent();
                    user = new userModel_1.UserModel({ email: email, password: hash, firstName: firstName, lastName: lastName, phoneNum: phoneNum, role: role, department: department });
                    return [4 /*yield*/, user.save()];
                case 2:
                    userDB = _b.sent();
                    //console.log(userDB)
                    res.send({ ok: true, userDB: userDB });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.send({ error: error_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.registerUser = registerUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userDB, hash, match, cookie, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!email || !password)
                        throw new Error("Please complete all fields");
                    return [4 /*yield*/, userModel_1.UserModel.findOne({ email: email })];
                case 1:
                    userDB = _b.sent();
                    if (!userDB)
                        throw new Error("Email not found");
                    hash = userDB.password;
                    if (!hash)
                        throw new Error("hash not found");
                    return [4 /*yield*/, bcrypt.compare(password, hash)];
                case 2:
                    match = _b.sent();
                    if (!match)
                        throw new Error("password incorrect");
                    cookie = {
                        uid: userDB._id,
                        role: userDB.role
                    };
                    token = jwt.encode(cookie, secret);
                    res.cookie("user", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
                    res.send({ ok: true });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error(error_2);
                    res.status(401).send({ error: error_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function LogOutCockie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // delete user coockie
                res.cookie('user', '', { expires: new Date(0) });
                res.send({ ok: true });
            }
            catch (error) {
                console.error(error);
                res.send({ error: error.message });
            }
            return [2 /*return*/];
        });
    });
}
exports.LogOutCockie = LogOutCockie;
function getLoggedUserDB(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            try {
                user = req.user;
                if (!user)
                    throw new Error("user not found");
                res.send({ ok: true, user: user });
            }
            catch (error) {
                console.error(error);
                res.send({ error: error.message });
            }
            return [2 /*return*/];
        });
    });
}
exports.getLoggedUserDB = getLoggedUserDB;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userModel_1.UserModel.find()];
                case 1:
                    users = _a.sent();
                    res.send({ ok: true, users: users });
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
exports.getUsers = getUsers;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, user, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, userModel_1.UserModel.findByIdAndDelete(_id)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("user not found");
                    res.send({ ok: true, user: user });
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
exports.deleteUser = deleteUser;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.query._id;
                    return [4 /*yield*/, userModel_1.UserModel.findById(_id)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("user not found");
                    res.send({ ok: true, user: user });
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
exports.getUserById = getUserById;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, phoneNum, email, role, _id, department, updatedFields, updatedUser, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, phoneNum = _a.phoneNum, email = _a.email, role = _a.role, _id = _a._id, department = _a.department;
                    updatedFields = {};
                    if (firstName) {
                        updatedFields.firstName = firstName;
                    }
                    if (lastName) {
                        updatedFields.lastName = lastName;
                    }
                    if (phoneNum) {
                        updatedFields.phoneNum = phoneNum;
                    }
                    if (email) {
                        updatedFields.email = email;
                    }
                    if (role) {
                        updatedFields.role = role;
                    }
                    if (department) {
                        updatedFields.department = department;
                    }
                    return [4 /*yield*/, userModel_1.UserModel.findByIdAndUpdate(_id, updatedFields, { "new": true } // This option returns the updated document
                        )];
                case 1:
                    updatedUser = _b.sent();
                    if (!updatedUser) {
                        return [2 /*return*/, res.status(404).send({ error: 'User not found' })];
                    }
                    res.send({ ok: true, user: updatedUser });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    console.error(error_6);
                    res.status(500).send({ error: error_6.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _id, password, updatedFields, hash, updatedUser, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, _id = _a._id, password = _a.password;
                    if (!password)
                        throw new Error("Please complete all fields");
                    if (!_id)
                        throw new Error("no user id");
                    updatedFields = {};
                    if (!password) return [3 /*break*/, 2];
                    return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
                case 1:
                    hash = _b.sent();
                    updatedFields.password = hash;
                    _b.label = 2;
                case 2: return [4 /*yield*/, userModel_1.UserModel.findByIdAndUpdate(_id, updatedFields, { "new": true } // This option returns the updated document
                    )];
                case 3:
                    updatedUser = _b.sent();
                    if (!updatedUser) {
                        return [2 /*return*/, res.status(404).send({ error: 'User not found' })];
                    }
                    res.send({ ok: true, user: updatedUser });
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _b.sent();
                    console.error(error_7);
                    res.status(500).send({ error: error_7.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updatePassword = updatePassword;
function updatePersonalInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, phoneNum, _id, updatedFields, updatedUser, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, phoneNum = _a.phoneNum, _id = _a._id;
                    console.log(firstName, lastName, phoneNum, _id);
                    updatedFields = {};
                    if (firstName) {
                        updatedFields.firstName = firstName;
                    }
                    if (lastName) {
                        updatedFields.lastName = lastName;
                    }
                    if (phoneNum) {
                        updatedFields.phoneNum = phoneNum;
                    }
                    return [4 /*yield*/, userModel_1.UserModel.findByIdAndUpdate(_id, updatedFields, { "new": true } // This option returns the updated document
                        )];
                case 1:
                    updatedUser = _b.sent();
                    if (!updatedUser) {
                        return [2 /*return*/, res.status(404).send({ error: 'User not found' })];
                    }
                    res.send({ ok: true, user: updatedUser });
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    console.error(error_8);
                    res.status(500).send({ error: error_8.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updatePersonalInfo = updatePersonalInfo;
function getUsersByDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var department, users, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    department = req.query.department;
                    if (!department)
                        throw new Error("Department not selected");
                    return [4 /*yield*/, userModel_1.UserModel.find({ department: department })];
                case 1:
                    users = _a.sent();
                    if (!users)
                        throw new Error("No therapist");
                    res.send({ ok: true, users: users });
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    console.error(error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUsersByDepartment = getUsersByDepartment;
