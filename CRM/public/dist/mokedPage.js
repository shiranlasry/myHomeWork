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
var root = document.querySelector('#root');
function renderAddNewCase() {
    try {
        var formHTML = "<div class=\"form-container\">\n        <h2 class=\"form-heading\">Add New Case</h2>\n        <form onsubmit=\"hundleSubmitCase(event)\">\n          <div class=\"form-group\">\n            <label for=\"title\" class=\"label\"> title</label>\n            <input type=\"text\" class=\"form-control\" id=\"title\" placeholder=\"Enter your title\" required>\n          </div>\n          <div class=\"form-group\">\n          <select class=\"form-control\" id=\"department\" onchange=\"loadDepartmentInfo()\">\n            <option value=\"\" disabled selected>Select Department</option>\n                   </div><br>\n          <div class=\"form-group\">\n            <label for=\"description\" class=\"label\">Case description</label>\n             <textarea name=\"date\" id=\"description\" class=\"form-control\" placeholder=\"Enter your description\" cols=\"65\" rows=\"10\"></textarea>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"recivedDate\" class=\"label\">recived Date</label>\n            <input type='date' name=\"recivedDate\" id='recivedDate' />\n           </div>\n           <div class=\"form-group\">\n            <label for=\"closedDate\" class=\"label\">closed Date</label>\n            <input type='date' name=\"closedDate\" id='closedDate' />\n           </div>\n          <button type=\"submit\" class=\"btn btn-primary\">Add</button>\n        </form>\n      </div>";
        root.innerHTML = formHTML;
    }
    catch (error) {
        console.error(error);
    }
}
function hundleSubmitCase(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var title, description, recivedDate, closedDate, cases, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    title = ev.target.title.value;
                    description = ev.target.description.value;
                    recivedDate = ev.target.recivedDate.value;
                    closedDate = ev.target.closedDate.value;
                    console.log(recivedDate);
                    if (!title || !description)
                        throw new Error("fields are missing");
                    cases = {
                        title: title,
                        description: description,
                        recivedDate: recivedDate,
                        closedDate: closedDate
                    };
                    console.log(cases);
                    return [4 /*yield*/, fetch("/API/inquiry/add-inquiry", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(cases)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Server returned status: " + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
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
function renderViewCases() {
    try {
        var formHTML_1 = "<div class=\"form-container\">\n        <h2 class=\"form-heading\">View Cases</h2>\n        <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th scope=\"col\">Title</th>\n            <th scope=\"col\">Description</th>\n            <th scope=\"col\">Department</th>\n            <th scope=\"col\">Recived Date</th>\n            <th scope=\"col\">Closed Date</th>\n           \n          </tr>\n        </thead>\n        <tbody>";
        fetch("/API/inquiry/get-inquiries")
            .then(function (response) {
            if (!response.ok)
                throw new Error("Server returned status: " + response.status);
            return response.json();
        })
            .then(function (data) {
            var inquiries = data.inquiries;
            inquiries.forEach(function (inquiry) {
                formHTML_1 += "<tr>\n                    <td>" + inquiry.title + "</td>\n                    <td>" + inquiry.description + "</td>\n                    <td>" + inquiry.department + "</td>\n                    <td>" + inquiry.recivedDate + "</td>\n                    <td>" + inquiry.closedDate + "</td>\n                   \n                   \n                  </tr>";
            });
            formHTML_1 += "</tbody>\n                </table>\n                </div>";
            root.innerHTML = formHTML_1;
        });
    }
    catch (error) {
        console.error(error);
    }
}
function loadDepartmentInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, response, data, department, departmentName, phoneNum, departmentManager, managerPhone, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(8888);
                    departmentId = document.querySelector("#department").value;
                    console.log(departmentId);
                    return [4 /*yield*/, fetch("/API/department/get-department?_id=" + departmentId)];
                case 1:
                    response = _a.sent();
                    console.log(response, 222);
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
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
