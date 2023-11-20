"use strict";
exports.__esModule = true;
var express_1 = require("express");
var titleCont_1 = require("./titleCont");
var router = express_1["default"].Router();
router
    .post('/add-title', titleCont_1.createTitle)
    .get("/get-titles", titleCont_1.getTitles)
    .get("/get-title", titleCont_1.getTitle)
    .get("/get-title-name", titleCont_1.getTitleName)["delete"]("/delete-title", titleCont_1.deleteTitle)
    .patch("/update-title", titleCont_1.updateTitle);
exports["default"] = router;
