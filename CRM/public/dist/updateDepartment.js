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
function hundleSubmitDepartment(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentName, phoneNum, departmentManager, managerPhone, department, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    departmentName = ev.target.departmentName.value;
                    phoneNum = ev.target.phoneNum.value;
                    departmentManager = ev.target.departmentManager.value;
                    managerPhone = ev.target.managerPhone.value;
                    if (!departmentName || !phoneNum)
                        throw new Error("One or more fields are missing");
                    department = {
                        name: departmentName,
                        phoneNum: phoneNum,
                        departmentManager: departmentManager,
                        managerPhoneNum: managerPhone
                    };
                    console.log(department);
                    return [4 /*yield*/, fetch("/API/department/add-department", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(department)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    window.location.href = "updateDepartment.html";
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
function hundleSubmitDeleteDepartment(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, answer, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    departmentId = ev.target.department.value;
                    answer = confirm("Are you sure you want to delete this department?");
                    if (!answer)
                        return [2 /*return*/];
                    if (!departmentId)
                        throw new Error("One or more fields are missing");
                    return [4 /*yield*/, fetch("/API/department/delete-department?_id=" + departmentId, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    window.location.href = "updateDepartment.html";
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
function hundleSubmitEditDepartment(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, departmentName, phoneNum, departmentManager, managerPhone, department, response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    console.log("hundleSubmitEditDepartment");
                    departmentId = ev.target.department.value;
                    departmentName = ev.target.departmentName.value;
                    phoneNum = ev.target.phoneNum.value;
                    departmentManager = ev.target.departmentManager.value;
                    managerPhone = ev.target.managerPhone.value;
                    if (!departmentName || !phoneNum)
                        throw new Error("One or more fields are missing");
                    department = {
                        _id: departmentId,
                        name: departmentName,
                        phoneNum: phoneNum,
                        departmentManager: departmentManager,
                        managerPhoneNum: managerPhone
                    };
                    console.log(department);
                    return [4 /*yield*/, fetch("/API/department/update-department", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(department)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    window.location.href = "updateDepartment.html";
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
function renderViewForm() {
    try {
        console.log("renderViewForm");
        var form_1 = document.getElementById("formDiv");
        if (!form_1)
            throw new Error("Form div not found");
        var formHTML_1 = "<div class=\"form-container\">\n        <h2 class=\"form-heading\">View Department</h2>\n        <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th scope=\"col\">Department Name</th>\n            <th scope=\"col\">Phone Number</th>\n            <th scope=\"col\">Department Manager</th>\n            <th scope=\"col\">Manager Phone Number</th>\n          </tr>\n        </thead>\n        <tbody>";
        fetch("/API/department/get-departments")
            .then(function (response) {
            if (!response.ok)
                throw new Error("Server returned status: " + response.status);
            return response.json();
        })
            .then(function (data) {
            var departments = data.departments;
            departments.forEach(function (department) {
                formHTML_1 += "<tr>\n                    <td>" + department.name + "</td>\n                    <td>" + department.phoneNum + "</td>\n                    <td>" + department.departmentManager + "</td>\n                    <td>" + department.managerPhoneNum + "</td>\n                  </tr>";
            });
            formHTML_1 += "</tbody>\n                </table>\n                </div>";
            form_1.innerHTML = formHTML_1;
        });
    }
    catch (error) {
        console.error(error);
    }
}
function renderDeleteForm() {
    return __awaiter(this, void 0, void 0, function () {
        var form, formHTML_2, response, data, departments, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("renderDeleteForm");
                    form = document.getElementById("formDiv");
                    if (!form)
                        throw new Error("Form div not found");
                    formHTML_2 = "<div class=\"form-container\">\n        <h2 class=\"form-heading\">Delete Department</h2>\n        <form onsubmit=\"hundleSubmitDeleteDepartment(event)\">\n        <div class=\"form-group\">\n            <label for=\"department\" class=\"label\">Select Department</label>\n            <select class=\"form-control\" id=\"department\">\n            <option value=\"\" disabled selected>Select Department</option>";
                    return [4 /*yield*/, fetch("/API/department/get-departments")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    departments = data.departments;
                    departments.forEach(function (department) {
                        formHTML_2 += "<option value=\"" + department._id + "\">" + department.name + "</option>";
                    });
                    formHTML_2 += "</select>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\">Delete</button>\n        </form>\n        </div>";
                    form.innerHTML = formHTML_2;
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderAddNewForm() {
    try {
        console.log("renderAddNewForm");
        var form = document.getElementById("formDiv");
        if (!form)
            throw new Error("Form div not found");
        var formHTML = "<div class=\"form-container\">\n        <h2 class=\"form-heading\">Add New Department</h2>\n        <form onsubmit=\"hundleSubmitDepartment(event)\">\n          <div class=\"form-group\">\n            <label for=\"departmentName\" class=\"label\">*Department Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"departmentName\" placeholder=\"Enter Department Name\" required>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"phoneNum\" class=\"label\">*Phone Number</label>\n            <input type=\"text\" class=\"form-control\" id=\"phoneNum\" placeholder=\"Enter Phone Number\" required>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"departmentManager\" class=\"label\">Department Manager</label>\n            <input type=\"text\" class=\"form-control\" id=\"departmentManager\" placeholder=\"Enter Department Manager\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"managerPhone\" class=\"label\">Manager Phone Number</label>\n            <input type=\"text\" class=\"form-control\" id=\"managerPhone\" placeholder=\"Enter Phone Number\">\n           </div>\n          <button type=\"submit\" class=\"btn btn-primary\">Add</button>\n        </form>\n      </div>";
        form.innerHTML = formHTML;
    }
    catch (error) {
        console.error(error);
    }
}
function renderEditForm() {
    return __awaiter(this, void 0, void 0, function () {
        var form, formHTML_3, response, data, departments, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("renderEditForm");
                    form = document.getElementById("formDiv");
                    if (!form)
                        throw new Error("Form div not found");
                    formHTML_3 = "<div class=\"form-container\">\n        <h2 class=\"form-heading\">Edit Department</h2>\n        <form onsubmit=\"hundleSubmitEditDepartment(event)\">\n        <div class=\"form-group\">\n            <label for=\"department\" class=\"label\">Select Department</label>\n            <select class=\"form-control\" id=\"department\" onchange=\"loadDepartmentInfo()\">\n            <option value=\"\" disabled selected>Select Department</option>\n            ";
                    return [4 /*yield*/, fetch("/API/department/get-departments")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    departments = data.departments;
                    departments.forEach(function (department) {
                        formHTML_3 += "<option value=\"" + department._id + "\">" + department.name + "</option>";
                    });
                    formHTML_3 += "</select>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"departmentName\" class=\"label\">*Department Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"departmentName\" placeholder=\"Department Name\" required>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"phoneNum\" class=\"label\">*Phone Number</label>\n            <input type=\"text\" class=\"form-control\" id=\"phoneNum\" placeholder=\"Phone Number\" required>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"departmentManager\" class=\"label\">Department Manager</label>\n            <input type=\"text\" class=\"form-control\" id=\"departmentManager\" placeholder=\"Department Manager\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"managerPhone\" class=\"label\">Department Manager Phone Number</label>\n            <input type=\"text\" class=\"form-control\" id=\"managerPhone\" placeholder=\"Department Manager Phone Number\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\">Edit</button>\n        </form>\n        </div>";
                    form.innerHTML = formHTML_3;
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loadDepartmentInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, response, data, department, departmentName, phoneNum, departmentManager, managerPhone, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    departmentId = document.querySelector("#department").value;
                    console.log(departmentId);
                    return [4 /*yield*/, fetch("/API/department/get-department?_id=" + departmentId)];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    department = data.department;
                    departmentName = document.querySelector("#departmentName");
                    phoneNum = document.querySelector("#phoneNum");
                    departmentManager = document.querySelector("#departmentManager");
                    managerPhone = document.querySelector("#managerPhone");
                    departmentName.value = department.name;
                    phoneNum.value = department.phoneNum;
                    departmentManager.value = department.departmentManager;
                    managerPhone.value = department.managerPhoneNum;
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
