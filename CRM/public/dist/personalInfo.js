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
function getPersonalInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/user/get-logged-user")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.user];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, null]; // Return null on error
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderPersonalInfoForm() {
    return __awaiter(this, void 0, void 0, function () {
        var userPersonalInfo, userDeailesDiv, deparmentName, form, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getPersonalInfo()];
                case 1:
                    userPersonalInfo = _a.sent();
                    if (!userPersonalInfo) {
                        throw new Error("User is not logged in");
                    }
                    userDeailesDiv = document.querySelector("#user-details-div");
                    if (!userDeailesDiv) {
                        throw new Error("No div with id user-details-div");
                    }
                    return [4 /*yield*/, getDepartmentName(userPersonalInfo.department)];
                case 2:
                    deparmentName = _a.sent();
                    form = document.createElement("form");
                    form.id = "personal-info-form";
                    form.innerHTML = "\n        <div class=\"form-group\">\n        <label for=\"firstName\">First Name:</label>\n        <input type=\"text\" id=\"firstName\" value=\"" + userPersonalInfo.firstName + "\" placeholder=\"First Name\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"lastName\">Last Name:</label>\n        <input type=\"text\" id=\"lastName\" value=\"" + userPersonalInfo.lastName + "\" placeholder=\"Last Name\">  \n        </div>\n        <div class=\"form-group\">\n        <label for=\"phone\">Phone:</label>\n        <input type=\"text\" id=\"phone\" value=\"" + userPersonalInfo.phoneNum + "\" placeholder=\"Phone\">\n        </div>\n        <div class=\"form-group\">\n        <label> Email: " + userPersonalInfo.email + "</label>\n        </div>\n    <div>\n    <label for=\"role\">Role:</label>\n    <label>" + userPersonalInfo.role + "</label>\n    </div>\n    <div>\n    <label for=\"department\">Department:</label>\n    <label>" + deparmentName + " </label>\n    </div>\n    <div>\n    <input type=\"submit\" value=\"Save\">\n    </div> ";
                    userDeailesDiv.appendChild(form);
                    userDeailesDiv.addEventListener("submit", updatePersonalInfo);
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
function updatePersonalInfo(event) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, lastName, phoneNum, user, response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    firstName = event.target.firstName.value;
                    lastName = event.target.lastName.value;
                    phoneNum = event.target.phone.value;
                    return [4 /*yield*/, getPersonalInfo()];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("User is not logged in");
                    }
                    return [4 /*yield*/, fetch("/API/user/update-personal-info", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ firstName: firstName, lastName: lastName, phoneNum: phoneNum, _id: user._id })
                        })];
                case 3:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    if (data.ok) {
                        alert("Personal info updated successfully");
                    }
                    else {
                        alert("Something went wrong");
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getDepartmentName(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/department/get-department-name?_id=" + _id, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.departmentName];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
renderPersonalInfoForm();
