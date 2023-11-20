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
function hundleRegister(event) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, lastName, phoneNum, email, password, isAdminCheckbox, role, department, user, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    firstName = event.target.firstName.value;
                    lastName = event.target.lastName.value;
                    phoneNum = event.target.phoneNum.value;
                    email = event.target.email.value;
                    password = event.target.password.value;
                    isAdminCheckbox = event.target.querySelector('#isAdmin');
                    role = isAdminCheckbox.checked ? "admin" : "user";
                    department = event.target.querySelector('#department-register').value;
                    user = { email: email, password: password, firstName: firstName, lastName: lastName, phoneNum: phoneNum, role: role, department: department };
                    if (!user.firstName || !user.lastName || !user.phoneNum || !user.email || !user.password || !user.role || !user.department)
                        throw new Error("missing some details");
                    return [4 /*yield*/, fetch("API/user/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok) {
                        alert(data.error);
                        throw new Error(data.error);
                    }
                    alert("user created");
                    window.location.href = "updateUsers.html";
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
// Fetch department options from the server API and populate the dropdown
function populateDepartmentDropdown() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentSelect_1, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    departmentSelect_1 = document.querySelector('#department-register');
                    if (!departmentSelect_1)
                        throw new Error("Department dropdown not found");
                    ; // No department dropdown in this page, so exit the function without a
                    return [4 /*yield*/, fetch("API/department/get-departments")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        // Clear existing options
                        departmentSelect_1.innerHTML = '<option value="">Select a department</option>';
                        // Populate the dropdown with options from the API response
                        data.departments.forEach(function (department) {
                            var option = document.createElement('option');
                            option.value = department._id; // You might want to use a unique identifier for each department
                            option.textContent = department.name; // Display the department name
                            departmentSelect_1.appendChild(option);
                        });
                    }
                    else {
                        console.error("Failed to fetch department options");
                    }
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
populateDepartmentDropdown();
