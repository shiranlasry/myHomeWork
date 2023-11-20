"use strict";
//user routes
exports.__esModule = true;
var express_1 = require("express");
var userCont_1 = require("./userCont");
var users_1 = require("./middelware/users");
var router = express_1["default"].Router();
router
    .post('/log-in', userCont_1.login)
    .post('/register', users_1.isAdmin, userCont_1.registerUser)
    .get('/get-logged-user', userCont_1.getLoggedUserDB)
    .get('/get-users-by-department', userCont_1.getUsersByDepartment)
    .get('/get-users', users_1.isAdmin, userCont_1.getUsers)
    .get('/get-user-by-id', userCont_1.getUserById)["delete"]('/delete-user', users_1.isAdmin, userCont_1.deleteUser)
    .patch('/update-user', users_1.isAdmin, userCont_1.updateUser)
    .patch('/update-password', users_1.isAdmin, userCont_1.updatePassword)
    .post('/log-out', userCont_1.LogOutCockie)
    .patch('/update-personal-info', userCont_1.updatePersonalInfo);
exports["default"] = router;
