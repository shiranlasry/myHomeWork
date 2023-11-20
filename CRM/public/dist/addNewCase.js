var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function getCreatorUser() {
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
function populateDepartmentsAndTitelsDropdown() {
    return __awaiter(this, void 0, void 0, function () {
        var departmentSelect_1, CreatorUser, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    departmentSelect_1 = document.querySelector('#department-AddNewCase');
                    if (!departmentSelect_1)
                        throw new Error("Department dropdown not found");
                    return [4 /*yield*/, getCreatorUser()];
                case 1:
                    CreatorUser = _a.sent();
                    if (!CreatorUser)
                        throw new Error("User not logged in");
                    return [4 /*yield*/, fetch("API/department/get-departments-by-userId?departmentId=" + CreatorUser.department)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.ok) {
                        // Clear existing options
                        departmentSelect_1.innerHTML = '<option value="">Select a department</option>';
                        //if departments is array render forech
                        data.departments.forEach(function (department) {
                            var option = document.createElement('option');
                            option.value = department._id; // You might want to use a unique identifier for each department
                            option.textContent = department.name; // Display the department name
                            departmentSelect_1.appendChild(option);
                        });
                        // add event on chenge department load titels
                        departmentSelect_1.addEventListener('change', loadTitels);
                        departmentSelect_1.addEventListener('change', populateInChargeOfDropdown);
                    }
                    else {
                        throw new Error(data.message);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function populateInChargeOfDropdown(event) {
    return __awaiter(this, void 0, void 0, function () {
        var usersSelect_1, department, response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    usersSelect_1 = document.querySelector('#inChargeOf-AddNewCase');
                    if (!usersSelect_1)
                        throw new Error("usersSelect dropdown not found");
                    department = event.target.value;
                    if (!department)
                        throw new Error("Department not selected");
                    return [4 /*yield*/, fetch("API/user/get-users-by-department?department=" + department)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        // Clear existing options
                        usersSelect_1.innerHTML = '<option value="">Choose a therapist</option>';
                        // Populate the dropdown with options from the API response
                        data.users.forEach(function (user) {
                            var option = document.createElement('option');
                            option.value = user._id; // You might want to use a unique identifier for each department
                            option.textContent = user.firstName + ' ' + user.lastName; // Display the department name
                            usersSelect_1.appendChild(option);
                        });
                    }
                    else {
                        throw new Error(data.message);
                    }
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
function loadTitels(event) {
    return __awaiter(this, void 0, void 0, function () {
        var titleSelect_1, department, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    titleSelect_1 = document.querySelector('#title-AddNewCase');
                    if (!titleSelect_1)
                        throw new Error("Title dropdown not found");
                    department = event.target.value;
                    if (!department)
                        throw new Error("Department not selected");
                    return [4 /*yield*/, fetch("API/title/get-titles?department=" + department)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        // Clear existing options
                        titleSelect_1.innerHTML = '<option value="">Select a title</option>';
                        // Populate the dropdown with options from the API response
                        data.titles.forEach(function (title) {
                            var option = document.createElement('option');
                            option.value = title._id; // You might want to use a unique identifier for each department
                            option.textContent = title.title; // Display the department name
                            titleSelect_1.appendChild(option);
                        });
                    }
                    else {
                        throw new Error(data.message);
                    }
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
function renderNewCaseComplainant() {
    try {
        var html = "<div class =\"section\">\n         <h2>Complainant details</h2>    \n        <div class=\"form-group\">\n        <label for=\"phoneNum\">Phone Number:</label>\n        <input type=\"tel\" id=\"phoneNum\" name=\"phoneNum\" placeholder=\"Enter phone number\" required>\n    </div>\n        <div class=\"form-group\">\n        <label for=\"firstName\">First Name:</label>\n        <input type=\"text\" id=\"firstName\" name=\"firstName\" placeholder=\"Enter first name\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"lastName\">Last Name:</label>\n        <input type=\"text\" id=\"lastName\" name=\"lastName\" placeholder=\"Enter last name\" required>\n    </div>\n  \n    <div class=\"form-group\">\n        <label for=\"street\">Street:</label>\n        <input type=\"text\" id=\"street-complainant\" name=\"street\" placeholder=\"Enter street\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"houseNum\">House Number:</label>\n        <input type=\"text\" id=\"houseNum-complainant\" name=\"houseNum\" placeholder=\"Enter house number\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"apartmentNum\">Apartment Number:</label>\n        <input type=\"text\" id=\"apartmentNum-complainant\" name=\"apartmentNum\" placeholder=\"Enter apartment number\">\n    </div>\n    </div>\n        <input type=\"submit\" value=\"Submit\"> \n    </form> ";
        return html;
    }
    catch (error) {
        console.error(error);
    }
}
function renderNewCaseService() {
    try {
        return "<form onsubmit=\"hundleAddNewCase(event)\">\n    <!-- department select -->\n    <div class =\"section\">\n    <h2>Case details</h2>\n    <div class=\"form-group\">\n        <label for=\"department\">Department:</label>\n        <select id=\"department-AddNewCase\" name=\"department\" required>\n            \n        </select>\n    </div>\n    <!-- title select -->\n    <div class=\"form-group\">\n        <label for=\"title\">Title:</label>\n        <select id=\"title-AddNewCase\" name=\"title\" required>\n            <option value=\"\">Select a title</option>\n        </select>       \n    </div>\n    <div class=\"form-group\">\n    <label for=\"street-AddNewCase\">Street:</label>\n    <input type=\"text\" id=\"street-AddNewCase\" name=\"street-AddNewCase\" placeholder=\"Enter street\" list=\"street-suggestions\">\n    </div>\n    <div class=\"form-group\">\n    <label for=\"streetNumber-AddNewCase\">Number:</label>\n    <input type=\"number\" id=\"streetNumber-AddNewCase\" name=\"streetNumber-AddNewCase\" placeholder=\"Enter number\">\n    </div>\n    <!-- in charge of input -->\n    <div class=\"form-group\">\n        <label for=\"inChargeOf\">in charge of:</label>\n        <select id=\"inChargeOf-AddNewCase\" name=\"inChargeOf\" required>\n            <option value=\"\">Choose a therapist </option>\n        </select>       \n    </div>\n    <!-- description input -->\n    <div class=\"form-group\">\n             <label for=\"description-AddNewCase\">description:</label>\n            <input type=\"text\" id=\"description-AddNewCase\" name=\"description-AddNewCase\" placeholder=\"Enter description\" required>\n    </div>\n    <div class=\"form-group\">\n    <label for=\"status\">status:</label> \n    <select id=\"status-AddNewCase\" name=\"status\" required>\n        <option value=\"\">Select a status</option>\n        <option value=\"open\">open</option>\n        <option value=\"closed\">closed</option>\n        <option value=\"inProgress\">inProgress</option>\n    </select>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"priority\">priority:</label>\n        <select id=\"priority-AddNewCase\" name=\"priority\" required>\n            <option value=\"\">Select a priority</option>\n            <option value=\"low\">low</option>\n            <option value=\"medium\">medium</option> \n            <option value=\"high\">high</option>\n        </select> \n    </div>\n    <div class=\"form-group\">\n    <label for=\"solution\">solution:</label>\n    <input type=\"text\" id=\"solution\" name=\"solution\" placeholder=\"Enter solution\">\n    </div>\n    </div>\n";
    }
    catch (error) {
        console.error(error);
    }
}
function renderCaseForm() {
    return __awaiter(this, void 0, void 0, function () {
        var creatorUser, newCaseForm, newCaseFormHTML, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCreatorUser()];
                case 1:
                    creatorUser = _a.sent();
                    if (!creatorUser) {
                        alert("You are not logged in");
                        window.location.href = "index.html";
                        return [2 /*return*/];
                    }
                    newCaseForm = document.getElementById("addNewCase");
                    if (!newCaseForm) {
                        throw new Error("Could not find new-case-form");
                    }
                    newCaseFormHTML = renderNewCaseService();
                    newCaseFormHTML += renderNewCaseComplainant();
                    newCaseForm.innerHTML = newCaseFormHTML;
                    populateDepartmentsAndTitelsDropdown();
                    getComplainantFields();
                    populateStreets();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getComplainantFields() {
    return __awaiter(this, void 0, void 0, function () {
        var phoneNumInput_1;
        var _this = this;
        return __generator(this, function (_a) {
            try {
                phoneNumInput_1 = document.querySelector('#phoneNum');
                if (phoneNumInput_1) {
                    phoneNumInput_1.addEventListener('input', function () { return __awaiter(_this, void 0, void 0, function () {
                        var phoneNum, complainant;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    phoneNum = phoneNumInput_1.value;
                                    if (!phoneNum) return [3 /*break*/, 2];
                                    return [4 /*yield*/, checkComplainantExist(phoneNum)];
                                case 1:
                                    complainant = _a.sent();
                                    if (complainant) {
                                        // Populate the other fields with complainant details
                                        document.querySelector('#firstName').value = complainant.firstName;
                                        document.querySelector('#lastName').value = complainant.lastName;
                                        document.querySelector('#street-complainant').value = complainant.street;
                                        document.querySelector('#houseNum-complainant').value = complainant.houseNum;
                                        document.querySelector('#apartmentNum-complainant').value = complainant.apartmentNum;
                                    }
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                }
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function populateStreets() {
    var nominatimEndpoint = "https://nominatim.openstreetmap.org/search";
    var streetInput = document.querySelector('#street-AddNewCase');
    if (!streetInput)
        return; // Ensure the input element exists
    // Initialize the event listener for input changes
    streetInput.addEventListener('input', function () {
        var searchTerm = streetInput.value;
        if (searchTerm.length < 3)
            return; // Ignore short input
        // Make a request to Nominatim API for address autocomplete
        fetch(nominatimEndpoint + "?q=" + searchTerm + "&format=json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Clear existing suggestions
            streetInput.setAttribute("list", "street-suggestions"); // Assign a datalist to the input
            var datalist = document.createElement('datalist');
            datalist.id = "street-suggestions";
            // Populate the datalist with suggestions
            data.forEach(function (item) {
                var option = document.createElement('option');
                option.value = item.display_name;
                datalist.appendChild(option);
            });
            // Replace the existing datalist (if any)
            var existingDatalist = document.querySelector('#street-suggestions');
            if (existingDatalist) {
                existingDatalist.replaceWith(datalist);
            }
            else {
                streetInput.insertAdjacentElement('afterend', datalist);
            }
        })["catch"](function (error) { return console.error(error); });
    });
}
function checkComplainantExist(phoneNum) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("API/complainant/get-complainant-by-phoneNum?phoneNum=" + phoneNum)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    debugger;
                    if (data.ok) { // return complainant from db
                        return [2 /*return*/, data.complainantDB];
                    }
                    else
                        return [2 /*return*/, false];
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
function addNewComplainant(complainant) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log('addNewComplainant');
                    return [4 /*yield*/, fetch("API/complainant/add-New-complainant", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(complainant)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        return [2 /*return*/, data.complainantDB];
                    }
                    else
                        return [2 /*return*/, false];
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    console.error(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function hundleAddNewCase(event) {
    return __awaiter(this, void 0, void 0, function () {
        var creatorUser, userId, departmentSelect, department, titleSelect, title, inChargeOfSelect, inChargeOf, streetCaseInput, streetCase, streetNumberCaseInput, streetNumberCase, descriptionInput, description, statusSelect, status, prioritySelect, priority, solutionInput, solution, firstNameInput, firstName, lastNameInput, lastName, phoneNumInput, phoneNum, streetInput, streeComplainant, houseNumInput, houseNumComplainant, apartmentNumInput, apartmentNumComplainant, caseComplainant, caseComplainantFileds, updatedFields, ComplainantUpdated, inquiry, response, data, isCaseAdded, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    event.preventDefault();
                    return [4 /*yield*/, getCreatorUser()];
                case 1:
                    creatorUser = _a.sent();
                    if (!creatorUser) {
                        alert("You are not logged in");
                        window.location.href = "index.html";
                        return [2 /*return*/];
                    }
                    userId = creatorUser._id;
                    departmentSelect = document.querySelector('#department-AddNewCase');
                    if (!departmentSelect)
                        throw new Error("Department dropdown not found");
                    department = departmentSelect.value;
                    if (!department)
                        throw new Error("Department not selected");
                    titleSelect = document.querySelector('#title-AddNewCase');
                    if (!titleSelect)
                        throw new Error("Title dropdown not found");
                    title = titleSelect.value;
                    if (!title)
                        throw new Error("Title not selected");
                    inChargeOfSelect = document.querySelector('#inChargeOf-AddNewCase');
                    if (!inChargeOfSelect)
                        throw new Error("inChargeOf dropdown not found");
                    inChargeOf = inChargeOfSelect.value;
                    if (!inChargeOf)
                        throw new Error("inChargeOf not selected");
                    streetCaseInput = document.querySelector('#street-AddNewCase');
                    if (!streetCaseInput)
                        throw new Error("street input not found");
                    streetCase = streetCaseInput.value;
                    if (!streetCase)
                        throw new Error("street not selected");
                    streetNumberCaseInput = document.querySelector('#streetNumber-AddNewCase');
                    if (!streetNumberCaseInput)
                        throw new Error("apartment number input not found");
                    streetNumberCase = streetNumberCaseInput.value;
                    if (!streetNumberCase)
                        throw new Error("apartment number not selected");
                    descriptionInput = document.querySelector('#description-AddNewCase');
                    if (!descriptionInput)
                        throw new Error("description input not found");
                    description = descriptionInput.value;
                    if (!description)
                        throw new Error("description not selected");
                    statusSelect = document.querySelector('#status-AddNewCase');
                    if (!statusSelect)
                        throw new Error("status dropdown not found");
                    status = statusSelect.value;
                    if (!status)
                        throw new Error("status not selected");
                    prioritySelect = document.querySelector('#priority-AddNewCase');
                    if (!prioritySelect)
                        throw new Error("priority dropdown not found");
                    priority = prioritySelect.value;
                    if (!priority)
                        throw new Error("priority not selected");
                    solutionInput = document.querySelector('#solution');
                    if (!solutionInput)
                        throw new Error("solution input not found");
                    solution = solutionInput.value;
                    if (status === "closed" && !solution)
                        throw new Error("Can't close inquiry without solution");
                    firstNameInput = document.querySelector('#firstName');
                    if (!firstNameInput)
                        throw new Error("firstName input not found");
                    firstName = firstNameInput.value;
                    lastNameInput = document.querySelector('#lastName');
                    if (!lastNameInput)
                        throw new Error("lastName input not found");
                    lastName = lastNameInput.value;
                    phoneNumInput = document.querySelector('#phoneNum');
                    if (!phoneNumInput)
                        throw new Error("phoneNum input not found");
                    phoneNum = phoneNumInput.value;
                    streetInput = document.querySelector('#street-complainant');
                    if (!streetInput)
                        throw new Error("streetInput input not found");
                    streeComplainant = streetInput.value ? streetInput.value : '';
                    houseNumInput = document.querySelector('#houseNum-complainant');
                    if (!houseNumInput)
                        throw new Error("houseNumInput input not found");
                    houseNumComplainant = houseNumInput.value ? houseNumInput.value : '';
                    apartmentNumInput = document.querySelector('#apartmentNum-complainant');
                    if (!apartmentNumInput)
                        throw new Error("apartmentNumInput input not found");
                    apartmentNumComplainant = apartmentNumInput.value ? apartmentNumInput.value : '';
                    return [4 /*yield*/, checkComplainantExist(phoneNum)];
                case 2:
                    caseComplainant = _a.sent();
                    caseComplainantFileds = {
                        firstName: firstName,
                        lastName: lastName,
                        phoneNum: phoneNum,
                        streeComplainant: streeComplainant,
                        houseNumComplainant: houseNumComplainant,
                        apartmentNumComplainant: apartmentNumComplainant
                    };
                    if (!!caseComplainant) return [3 /*break*/, 4];
                    return [4 /*yield*/, addNewComplainant(caseComplainantFileds)];
                case 3:
                    caseComplainant = _a.sent();
                    if (!caseComplainant)
                        throw new Error("Failed to add complainant");
                    return [3 /*break*/, 6];
                case 4:
                    updatedFields = {
                        firstName: firstName,
                        lastName: lastName,
                        street: streeComplainant,
                        houseNum: houseNumComplainant,
                        apartmentNum: apartmentNumComplainant
                    };
                    return [4 /*yield*/, updateComplainant(caseComplainant._id, updatedFields)];
                case 5:
                    ComplainantUpdated = _a.sent();
                    if (!ComplainantUpdated)
                        throw new Error("Failed to update complainant");
                    _a.label = 6;
                case 6:
                    inquiry = {
                        userCreatorId: userId,
                        department: department,
                        title: title,
                        streetCase: streetCase,
                        streetNumberCase: streetNumberCase,
                        description: description,
                        recivedDate: new Date(),
                        closedDate: null,
                        status: status,
                        priority: priority,
                        solution: solution
                    };
                    return [4 /*yield*/, fetch("API/inquiry/add-inquiry", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(inquiry)
                        })];
                case 7:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 8:
                    data = _a.sent();
                    if (!data.ok) return [3 /*break*/, 10];
                    return [4 /*yield*/, addNewCase(data.inquiryDB, inChargeOf, department, caseComplainant._id)];
                case 9:
                    isCaseAdded = _a.sent();
                    if (!isCaseAdded)
                        throw new Error("Failed to add case");
                    alert("Inquiry added successfully");
                    window.location.href = "CRM_homePage.html";
                    return [3 /*break*/, 11];
                case 10: throw new Error(data.message);
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_8 = _a.sent();
                    console.error(error_8);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function updateComplainant(complainantId, updatedFields) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/complainant/update-complainant', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(__assign({ complainantId: complainantId }, updatedFields))
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    debugger;
                    if (data) {
                        return [2 /*return*/, data.updatedComplainant
                            // You can perform any additional actions after a successful update here
                        ];
                        // You can perform any additional actions after a successful update here
                    }
                    else {
                        console.error('Failed to update complainant:', data.message);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _a.sent();
                    console.error(error_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addNewCase(inquiry, userId, departmentId, complainantId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("API/case/add-case", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ inquiry: inquiry, departmentId: departmentId, userId: userId, complainantId: complainantId })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_10 = _a.sent();
                    console.error(error_10);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
renderCaseForm();
