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
function hundleSubmitTitle(event) {
    return __awaiter(this, void 0, void 0, function () {
        var title, department, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    console.log("hundleSubmitTitle");
                    title = event.target.elements.title.value;
                    department = document.querySelector("#departmentTitle").value;
                    console.log(title, department);
                    return [4 /*yield*/, fetch("/API/title/add-title", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ title: title, department: department })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    window.location.href = "updateTitle.html";
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function hundleSubmitEditTitle(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, title, department, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    console.log("hundleSubmitEditTitle");
                    _id = document.querySelector("#oldTitle").value;
                    title = event.target.elements.newTitle.value;
                    department = document.querySelector("#departmentTitleNew").value;
                    console.log(_id, title, department);
                    return [4 /*yield*/, fetch("/API/title/update-title", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ _id: _id, title: title, department: department })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    window.location.href = "updateTitle.html";
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function hundleDeleteTitle(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    console.log("hundleDeleteTitle");
                    _id = document.querySelector("#title").value;
                    return [4 /*yield*/, fetch("/API/title/delete-title?_id=" + _id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ _id: _id })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    window.location.href = "updateTitle.html";
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderDeleteTitleForm() {
    return __awaiter(this, void 0, void 0, function () {
        var form, formHTML_1, responseUser, dataUser, user, response, data, titles, response, data, titles, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log("renderDeleteTitleForm");
                    form = document.getElementById("formDiv");
                    if (!form)
                        throw new Error("Form div not found");
                    formHTML_1 = "<div class=\"form-container\">\n            <h2 class=\"form-heading\">Delete Title</h2>\n            <form onsubmit=\"hundleDeleteTitle(event)\">\n                <div class=\"form-group\">\n                    <label for=\"title\" class=\"label\">* Title</label>\n                    <select class=\"form-control\" id=\"title\" required>\n                        <option value=\"\" disabled selected>Select Title</option>";
                    return [4 /*yield*/, fetch("/API/user/get-logged-user")];
                case 1:
                    responseUser = _a.sent();
                    return [4 /*yield*/, responseUser.json()];
                case 2:
                    dataUser = _a.sent();
                    user = dataUser.user;
                    if (!(user.role === "admin")) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("/API/title/get-titles")];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    titles = data.titles;
                    titles.forEach(function (title) {
                        formHTML_1 += "<option value=\"" + title._id + "\">" + title.title + "</option>";
                    });
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, fetch("/API/title/get-titles?department=" + user.department)];
                case 6:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 7:
                    data = _a.sent();
                    titles = data.titles;
                    titles.forEach(function (title) {
                        formHTML_1 += "<option value=\"" + title._id + "\">" + title.title + "</option>";
                    });
                    _a.label = 8;
                case 8:
                    formHTML_1 += "</select>\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">Delete</button>\n            </form>\n            </div>";
                    form.innerHTML = formHTML_1;
                    return [3 /*break*/, 10];
                case 9:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function renderViewTitlesForm() {
    return __awaiter(this, void 0, void 0, function () {
        var form, formHTML_2, responseUser, dataUser, user, response, data, titles, response, data, titles, error_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    console.log("renderViewTitlesForm");
                    form = document.getElementById("formDiv");
                    if (!form)
                        throw new Error("Form div not found");
                    formHTML_2 = "<div class=\"form-container\">\n            <h2 class=\"form-heading\">View Titles</h2>\n            <table class=\"table table-striped table-hover\">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Title</th>\n                    <th scope=\"col\">Department</th>\n                </tr>\n            </thead>\n            <tbody>";
                    return [4 /*yield*/, fetch("/API/user/get-logged-user")];
                case 1:
                    responseUser = _a.sent();
                    return [4 /*yield*/, responseUser.json()];
                case 2:
                    dataUser = _a.sent();
                    user = dataUser.user;
                    if (!(user.role === "admin")) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch("/API/title/get-titles")];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    titles = data.titles;
                    return [4 /*yield*/, Promise.all(titles.map(function (title) { return __awaiter(_this, void 0, void 0, function () {
                            var departmentName;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getDepartmentName(title.department)];
                                    case 1:
                                        departmentName = _a.sent();
                                        formHTML_2 += "<tr>\n                    <td>" + title.title + "</td>\n                    <td>" + departmentName + "</td>\n                </tr>";
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 6: return [4 /*yield*/, fetch("/API/title/get-titles?department=" + user.department)];
                case 7:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 8:
                    data = _a.sent();
                    titles = data.titles;
                    return [4 /*yield*/, Promise.all(titles.map(function (title) { return __awaiter(_this, void 0, void 0, function () {
                            var departmentName;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getDepartmentName(title.department)];
                                    case 1:
                                        departmentName = _a.sent();
                                        formHTML_2 += "<tr>\n                    <td>" + title.title + "</td>\n                    <td>" + departmentName + "</td>\n                </tr>";
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    formHTML_2 += "</tbody>\n            </table>\n            </div>";
                    form.innerHTML = formHTML_2;
                    return [3 /*break*/, 12];
                case 11:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function renderOldTitle() {
    return __awaiter(this, void 0, void 0, function () {
        var formHTML_3, responseUser, dataUser, user, response, data, titles, response, data, titles, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    formHTML_3 = "<div class=\"form-container\">\n            <h2 class=\"form-heading\">Edit Title</h2>\n            <form onsubmit=\"hundleSubmitEditTitle(event)\">\n                <div class=\"form-group\">\n                    <label for=\"oldTitle\" class=\"label\">* Old Title</label>\n                    <select class=\"form-control\" id=\"oldTitle\" required onchange=\"loadDepartmentName()\">\n                        <option value=\"\" disabled selected>Select Title</option>";
                    return [4 /*yield*/, fetch("/API/user/get-logged-user")];
                case 1:
                    responseUser = _a.sent();
                    return [4 /*yield*/, responseUser.json()];
                case 2:
                    dataUser = _a.sent();
                    user = dataUser.user;
                    if (!(user.role === "admin")) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("/API/title/get-titles")];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    titles = data.titles;
                    titles.forEach(function (title) {
                        formHTML_3 += "<option value=\"" + title._id + "\">" + title.title + "</option>";
                    });
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, fetch("/API/title/get-titles?department=" + user.department)];
                case 6:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 7:
                    data = _a.sent();
                    titles = data.titles;
                    titles.forEach(function (title) {
                        formHTML_3 += "<option value=\"" + title._id + "\">" + title.title + "</option>";
                    });
                    _a.label = 8;
                case 8:
                    formHTML_3 += "</select>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"departmentTitleOld\" class=\"label\">Old Department</label>\n                <input type=\"text\" class=\"form-control\" id=\"departmentTitleOld\" placeholder=\"Department\" readOnly>\n            </div>";
                    return [2 /*return*/, formHTML_3];
                case 9:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function renderNewTitle() {
    return __awaiter(this, void 0, void 0, function () {
        var formHTML_4, responseUser, dataUser, user, response, data, departments, department, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    formHTML_4 = "<div class=\"form-group\">\n                <label for=\"newTitle\" class=\"label\">* New Title</label>\n                <input type=\"text\" class=\"form-control\" id=\"newTitle\" placeholder=\"Enter New Title\" required>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"departmentTitleNew\" class=\"label\">* Select Department</label>\n                <select class=\"form-control\" id=\"departmentTitleNew\" required>\n                    <option value=\"\" disabled selected>Select Department</option>";
                    return [4 /*yield*/, fetch("/API/user/get-logged-user")];
                case 1:
                    responseUser = _a.sent();
                    return [4 /*yield*/, responseUser.json()];
                case 2:
                    dataUser = _a.sent();
                    user = dataUser.user;
                    if (!(user.role === "admin")) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("/API/department/get-departments")];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    departments = data.departments;
                    console.log(departments);
                    departments.forEach(function (department) {
                        formHTML_4 += "<option value=\"" + department._id + "\">" + department.name + "</option>";
                    });
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, getDepartmentName(user.department)];
                case 6:
                    department = _a.sent();
                    formHTML_4 += "<option value=\"" + user.department + "\">" + department + "</option>";
                    _a.label = 7;
                case 7:
                    // const response = await fetch("/API/department/get-departments");
                    // const data2 = await response.json();
                    // const departments = data2.departments;
                    // departments.forEach(department => {
                    //     formHTML += `<option value="${department._id}">${department.name}</option>`;
                    // });
                    formHTML_4 += "</select>\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">Update</button>\n            </form>\n            </div>";
                    return [2 /*return*/, formHTML_4];
                case 8:
                    error_7 = _a.sent();
                    console.error(error_7);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function renderEditTitleForm() {
    return __awaiter(this, void 0, void 0, function () {
        var form, formHTML, _a, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    console.log("renderUpdateTitleForm");
                    form = document.getElementById("formDiv");
                    if (!form)
                        throw new Error("Form div not found");
                    return [4 /*yield*/, renderOldTitle()];
                case 1:
                    formHTML = _b.sent();
                    _a = formHTML;
                    return [4 /*yield*/, renderNewTitle()];
                case 2:
                    formHTML = _a + _b.sent();
                    form.innerHTML = formHTML;
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _b.sent();
                    console.error(error_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderAddNewTitleForm() {
    return __awaiter(this, void 0, void 0, function () {
        var form, formHTML_5, responseUser, dataUser, user, response, data, departments, department, error_9, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    console.log("renderAddNewTitleForm");
                    form = document.getElementById("formDiv");
                    if (!form)
                        throw new Error("Form div not found");
                    formHTML_5 = "<div class=\"form-container\">\n            <h2 class=\"form-heading\">Add New Title</h2>\n            <form onsubmit=\"hundleSubmitTitle(event)\">\n                <div class=\"form-group\">\n                    <label for=\"title\" class=\"label\">* Title</label>\n                    <input type=\"text\" class=\"form-control\" id=\"title\" placeholder=\"Enter Title\" required>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"departmentTitle\" class=\"label\">* Select Department</label>\n                    <select class=\"form-control\" id=\"departmentTitle\" required>\n                        <option value=\"\" disabled selected>Select Department</option>";
                    return [4 /*yield*/, fetch("/API/user/get-logged-user")];
                case 2:
                    responseUser = _a.sent();
                    return [4 /*yield*/, responseUser.json()];
                case 3:
                    dataUser = _a.sent();
                    user = dataUser.user;
                    if (!(user.role === "admin")) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch("/API/department/get-departments")];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    departments = data.departments;
                    console.log(departments);
                    departments.forEach(function (department) {
                        formHTML_5 += "<option value=\"" + department._id + "\">" + department.name + "</option>";
                    });
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, getDepartmentName(user.department)];
                case 7:
                    department = _a.sent();
                    formHTML_5 += "<option value=\"" + user.department + "\">" + department + "</option>";
                    _a.label = 8;
                case 8:
                    formHTML_5 += "</select>\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">Add</button>\n            </form>\n            </div>";
                    form.innerHTML = formHTML_5;
                    return [3 /*break*/, 10];
                case 9:
                    error_9 = _a.sent();
                    console.error(error_9);
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_10 = _a.sent();
                    console.error(error_10);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function loadDepartmentName() {
    return __awaiter(this, void 0, void 0, function () {
        var _id, response, data, departmentTitle, departmentID, _a, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _id = document.querySelector("#oldTitle").value;
                    return [4 /*yield*/, fetch("/API/title/get-title?_id=" + _id)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    departmentTitle = data.title;
                    departmentID = departmentTitle.department;
                    _a = document.querySelector("#departmentTitleOld");
                    return [4 /*yield*/, getDepartmentName(departmentID)];
                case 3:
                    _a.value = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_11 = _b.sent();
                    console.error(error_11);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getDepartmentName(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, department, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/department/get-department?_id=" + _id)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    department = data.department;
                    return [2 /*return*/, department.name];
                case 3:
                    error_12 = _a.sent();
                    console.error(error_12);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
