//homepage ts
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
// get current user from server cookie
function getLoggedInUser() {
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
function LogOut() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("API/user/log-out", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server returned status: " + response.status);
                    }
                    alert("You are logged out");
                    window.location.href = "index.html";
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, null]; // Return null on error
                case 3: return [2 /*return*/];
            }
        });
    });
}
// render update user button for open page - for admin only
function renderUpdateUserBtnPage() {
    var updateUserDiv = document.querySelector("#updateUserDiv");
    var updateUserBtn = document.createElement("button");
    updateUserDiv.appendChild(updateUserBtn);
    updateUserBtn.innerText = "Update Users";
    //pn click go to update users page
    updateUserBtn.addEventListener("click", function () {
        window.location.href = "updateUsers.html";
    });
}
// render update department button for open page - for admin only
function renderUpdateDepartmentBtnPage() {
    var updateDepartmentDiv = document.querySelector("#updateDepartmentDiv");
    var updateDepartmentBtn = document.createElement("button");
    updateDepartmentDiv.appendChild(updateDepartmentBtn);
    updateDepartmentBtn.innerText = "Update Departments";
    //pn click go to update departments page
    updateDepartmentBtn.addEventListener("click", function () {
        window.location.href = "updateDepartment.html";
    });
}
// render update title button for open page - for admin only
function renderUpdateTitleBtnPage() {
    var updateTitleDiv = document.querySelector("#updateTitleDiv");
    var updateTitleBtn = document.createElement("button");
    updateTitleDiv.appendChild(updateTitleBtn);
    updateTitleBtn.innerText = "Update Titles";
    //pn click go to update titles page
    updateTitleBtn.addEventListener("click", function () {
        window.location.href = "updateTitle.html";
    });
}
function renderPersonalInfoPage() {
    window.location.href = "personalInfo.html";
}
function renderAddNewCasePage() {
    window.location.href = "addNewCase.html";
}
function renderAllCases() {
    return __awaiter(this, void 0, void 0, function () {
        var user, response, data, globalCases_1, searchQuery_1, searchInput, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, getLoggedInUser()];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("user not found");
                    return [4 /*yield*/, fetch("/API/department/get-departments-by-userId?departmentId=" + user.department)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!data.ok) return [3 /*break*/, 5];
                    globalCases_1 = [];
                    // Use Promise.all to await all departmentCases
                    return [4 /*yield*/, Promise.all(data.departments.map(function (department) { return __awaiter(_this, void 0, void 0, function () {
                            var departmentCases;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getDepartmentCases(department._id)];
                                    case 1:
                                        departmentCases = _a.sent();
                                        if (departmentCases) {
                                            globalCases_1.push.apply(globalCases_1, departmentCases);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    // Use Promise.all to await all departmentCases
                    _a.sent();
                    console.log("globalCases: ", globalCases_1);
                    searchQuery_1 = '';
                    searchInput = document.querySelector('#searchInputCase');
                    renderCasesList(globalCases_1, '');
                    // Add an event listener to capture changes in the search input field
                    searchInput.addEventListener('input', function (event) {
                        // Update the searchQuery variable with the user's input
                        searchQuery_1 = event.target.value;
                        // cleare case details
                        var caseDetailsDiv = document.querySelector("#case-details");
                        if (!caseDetailsDiv)
                            throw new Error('Missing elements');
                        caseDetailsDiv.innerHTML = '';
                        renderCasesList(globalCases_1, searchQuery_1);
                    });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function renderMyCases() {
    return __awaiter(this, void 0, void 0, function () {
        var user, response, data, myCases_1, searchQuery_2, searchInput, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getLoggedInUser()];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("user not found");
                    console.log(user._id);
                    return [4 /*yield*/, fetch("/API/case/get-cases-by-userId?userId=" + user._id)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    myCases_1 = data.cases;
                    if (!myCases_1)
                        throw new Error("cases not found");
                    searchQuery_2 = '';
                    searchInput = document.querySelector('#searchInputCase');
                    renderCasesList(myCases_1, '');
                    // Add an event listener to capture changes in the search input field
                    searchInput.addEventListener('input', function (event) {
                        // Update the searchQuery variable with the user's input
                        searchQuery_2 = event.target.value;
                        // cleare case details
                        var caseDetailsDiv = document.querySelector("#case-details");
                        if (!caseDetailsDiv)
                            throw new Error('Missing elements');
                        caseDetailsDiv.innerHTML = '';
                        renderCasesList(myCases_1, searchQuery_2);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function renderCasesList(cases, searchQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var casesListDiv_1, filteredCases, noResultsMessage;
        return __generator(this, function (_a) {
            try {
                if (!cases)
                    throw new Error("no cases to render");
                casesListDiv_1 = document.querySelector("#casesList");
                if (!casesListDiv_1)
                    throw new Error('Missing elements');
                casesListDiv_1.innerHTML = '';
                filteredCases = cases.filter(function (case_) {
                    var orderNumber = case_.orderNumber + " ";
                    return orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
                });
                if (filteredCases.length === 0) {
                    noResultsMessage = document.createElement('p');
                    noResultsMessage.textContent = 'No matching cases found.';
                    casesListDiv_1.appendChild(noResultsMessage);
                }
                else {
                    filteredCases.forEach(function (case_) {
                        var case_Item = document.createElement('div');
                        var case_number = document.createElement('div');
                        var case_discription = document.createElement('div');
                        var case_createDate = document.createElement('div');
                        case_Item.classList.add('case-item');
                        case_number.textContent = case_.orderNumber;
                        case_discription.textContent = case_.inquiry.description;
                        case_createDate.textContent = formatDate(case_.inquiry.recivedDate);
                        case_Item.addEventListener('click', function () {
                            //remove bold class from all users
                            var caseItems = document.querySelectorAll('.case-item');
                            caseItems.forEach(function (caseItem) {
                                caseItem.classList.remove('bold-case');
                            });
                            clearCaseDetails();
                            //set caseItembold class to clicked item 
                            case_Item.classList.add('bold-case');
                            console.log(case_);
                            showCaseDetails(case_);
                        });
                        case_Item.appendChild(case_number);
                        case_Item.appendChild(case_discription);
                        case_Item.appendChild(case_createDate);
                        casesListDiv_1.appendChild(case_Item);
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function getDepartmentName(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_5;
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
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getTitleName(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/title/get-title-name?_id=" + _id, {
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
                    return [2 /*return*/, data.title];
                case 3:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUsersDepartment(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!_id)
                        throw new Error("no department id");
                    return [4 /*yield*/, fetch("/API/user/get-users-by-department?department=" + _id)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok)
                        throw new Error("users not found");
                    return [2 /*return*/, data.users];
                case 3:
                    error_7 = _a.sent();
                    console.error(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getComplainanDetails(complainantId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/API/complainant/get-complainant-by-id?_id=" + complainantId)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok)
                        throw new Error("complainant not found");
                    return [2 /*return*/, data.complainant];
            }
        });
    });
}
function clearCaseDetails() {
    var caseDetailsDiv = document.querySelector("#caseDetails");
    var updateCaseBtn = document.querySelector('#updateCaseBtn');
    var deleteCaseBtn = document.querySelector('#deleteCaseBtn');
    var complainanDetailsPopUpDiv = document.querySelector('#complainanDetailsPopUpDiv');
    var showcomplainanDetailsBtn = document.querySelector('#showcomplainanDetailsBtn');
    if (!updateCaseBtn || !deleteCaseBtn || !showcomplainanDetailsBtn || !complainanDetailsPopUpDiv)
        throw new Error('Missing elements');
    updateCaseBtn.style.display = 'none';
    deleteCaseBtn.style.display = 'none';
    showcomplainanDetailsBtn.style.display = 'none';
    if (!caseDetailsDiv)
        throw new Error('Missing elements');
    caseDetailsDiv.innerHTML = '';
    complainanDetailsPopUpDiv.innerHTML = '';
    complainanDetailsPopUpDiv.style.display = 'none';
}
function popUpComplainanDetails(complainant) {
    // get complainan details from server
    try {
        // pop up with complainan details from case.complainantId
        var complainanDetailsPopUpDiv_1 = document.querySelector('#complainanDetailsPopUpDiv');
        if (!complainanDetailsPopUpDiv_1)
            throw new Error('Missing elements -complainanDetailsPopUpDiv');
        complainanDetailsPopUpDiv_1.innerHTML = '';
        complainanDetailsPopUpDiv_1.style.display = 'block';
        var closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', function () {
            complainanDetailsPopUpDiv_1.innerHTML = '';
            complainanDetailsPopUpDiv_1.style.display = 'none';
        });
        complainanDetailsPopUpDiv_1.appendChild(closeBtn);
        var complainanDetails = document.createElement('div');
        complainanDetails.classList.add('complainan-details');
        complainanDetails.innerHTML = "\n        <h1>Complainan Details</h1>\n        <div class=\"form-group case-group\">\n            <label>First Name : " + complainant.firstName + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n            <label>Last Name : " + complainant.lastName + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n            <label>Phone Number : " + complainant.phoneNum + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n            <label>Street : " + (complainant.street ? complainant.street : '---') + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n            <label>House Number : " + (complainant.houseNum ? complainant.houseNum : '---') + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n            <label>Apartment Number : " + (complainant.apartmentNum ? complainant.apartmentNum : '---') + "</label>\n        </div>\n        ";
        complainanDetailsPopUpDiv_1.appendChild(complainanDetails);
    }
    catch (error) {
        console.error(error);
    }
}
function deleteCase() {
    return __awaiter(this, void 0, void 0, function () {
        var caseDetails, userId, response, data, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    caseDetails = document.querySelector('#caseDetails');
                    if (!caseDetails)
                        throw new Error('Missing elements');
                    userId = caseDetails.getAttribute('data-case-id');
                    return [4 /*yield*/, fetch("/API/case/delete-case?_id=" + userId, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok)
                        throw new Error("case not found");
                    alert("case deleted");
                    window.location.href = "CRM_homePage.html";
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    console.error(error_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateCase(inquiry_id, case_id) {
    return __awaiter(this, void 0, void 0, function () {
        var caseDetails, userId, inChargeSelesct, statusSelest, solution, description, street, streetNumber, response, data, response2, data2, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!inquiry_id || !case_id)
                        throw new Error('Missing elements');
                    caseDetails = document.querySelector('#caseDetails');
                    if (!caseDetails)
                        throw new Error('Missing elements');
                    userId = caseDetails.getAttribute('data-case-id');
                    inChargeSelesct = document.querySelector('#inChargeSelesct');
                    statusSelest = document.querySelector('#statusSelest');
                    solution = document.querySelector('#solution');
                    description = document.querySelector('#description');
                    street = document.querySelector('#street');
                    streetNumber = document.querySelector('#streetNumber');
                    if (!inChargeSelesct || !statusSelest || !solution || !description || !street || !streetNumber)
                        throw new Error('Missing elements');
                    // if status is closed - must have solution
                    if (statusSelest.value === 'closed' && !solution.value) {
                        alert('must have solution');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("/API/inquiry/update-inquiry", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                _id: inquiry_id,
                                status: statusSelest.value,
                                solution: solution.value,
                                description: description.value,
                                street: street.value,
                                streetNumber: streetNumber.value
                            })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok)
                        throw new Error("inquiry not found");
                    return [4 /*yield*/, fetch("/API/case/update-case", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                case_id: case_id,
                                userId: inChargeSelesct.value,
                                inquiry: data.existingInquiry
                            })
                        })];
                case 3:
                    response2 = _a.sent();
                    return [4 /*yield*/, response2.json()];
                case 4:
                    data2 = _a.sent();
                    if (!data2.ok)
                        throw new Error("case not found");
                    alert("case updated");
                    renderAllCases();
                    return [3 /*break*/, 6];
                case 5:
                    error_9 = _a.sent();
                    console.error(error_9);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function showCaseDetails(case_) {
    return __awaiter(this, void 0, void 0, function () {
        var caseDetails, updateCaseBtn, deleteCaseBtn, showcomplainanDetailsBtn, departmentName, titleName, complainant_1, inchargesUserId, usersDepartment, inChargeSelesct_1, statusSelest, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    caseDetails = document.querySelector('#caseDetails');
                    updateCaseBtn = document.querySelector('#updateCaseBtn');
                    updateCaseBtn.onclick = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, updateCase(case_.inquiry._id, case_._id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    };
                    deleteCaseBtn = document.querySelector('#deleteCaseBtn');
                    deleteCaseBtn.onclick = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, deleteCase()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    };
                    showcomplainanDetailsBtn = document.querySelector('#showcomplainanDetailsBtn');
                    return [4 /*yield*/, getDepartmentName(case_.departmentId)];
                case 1:
                    departmentName = _a.sent();
                    return [4 /*yield*/, getTitleName(case_.inquiry.title)];
                case 2:
                    titleName = _a.sent();
                    return [4 /*yield*/, getComplainanDetails(case_.complainantId)];
                case 3:
                    complainant_1 = _a.sent();
                    inchargesUserId = case_.userId;
                    return [4 /*yield*/, getUsersDepartment(case_.departmentId)];
                case 4:
                    usersDepartment = _a.sent();
                    if (!caseDetails || !updateCaseBtn || !deleteCaseBtn ||
                        !case_ || !departmentName || !titleName || !inchargesUserId ||
                        !usersDepartment || !showcomplainanDetailsBtn || !complainant_1)
                        throw new Error('missing elements');
                    caseDetails.setAttribute('data-case-id', case_._id);
                    //  deleteUserBtn updateUserBtn display block
                    updateCaseBtn.style.display = 'block';
                    deleteCaseBtn.style.display = 'block';
                    showcomplainanDetailsBtn.style.display = 'block';
                    // add event listener to showcomplainanDetailsBtn btn
                    showcomplainanDetailsBtn.addEventListener('click', function () {
                        // pop up with complainan details from case.complainantId
                        popUpComplainanDetails(complainant_1);
                    });
                    caseDetails.innerHTML = "\n        <form id=\"caseDetailsForm\"> \n        <div class=\"form-group case-group\">\n            <label>Case Number : " + case_.orderNumber + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n            <label>Created Date : " + formatDate(case_.inquiry.recivedDate) + "</label> \n        </div>\n        <div class=\"form-group case-group\">\n        <label>Deprtment Name : " + departmentName + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n        <label>Title Name : " + titleName + "</label>\n        </div>\n        <div class=\"form-group case-group\">\n        <label for=\"inChargeSelesct\">In charge Of </label>\n        <select id=\"inChargeSelesct\" class=\"form-control\">\n        </select>\n        </div>\n        <div class=\"form-group case-group\">\n        <label for=\"status\">status </label>\n        <select id=\"statusSelest\" class=\"form-control\">\n        <option value=\"open\">open</option>\n        <option value=\"inProgress\">in progress</option>\n        <option value=\"closed\">close</option>\n        </select>\n        </div>\n        <div class=\"form-group case-group\">\n        <label for=\"solution\">Enter Solution:</label>\n        <input type=\"text\" id=\"solution\" value=\"" + case_.inquiry.solution + "\" placeholder=\"solution\">\n        </div>\n        <div class=\"form-group case-group\">\n            <label for=\"description\">description:</label>\n            <input type=\"text\" id=\"description\" value=\"" + case_.inquiry.description + "\" placeholder=\"description\">\n        </div>\n        <div class=\"form-group case-group\">\n            <label for=\"street\">street:</label>\n            <input type=\"text\" id=\"street\" value=\"" + case_.inquiry.street + "\" placeholder=\"street\">\n        </div>\n        <div class=\"form-group case-group\">\n            <label for=\"streetNumber\">street Number:</label>\n            <input type=\"text\" id=\"streetNumber\" value=\"" + case_.inquiry.streetNumber + "\" placeholder=\"street Number\">\n        </div>\n            </form> \n    ";
                    inChargeSelesct_1 = document.querySelector('#inChargeSelesct');
                    statusSelest = document.querySelector('#statusSelest');
                    if (!inChargeSelesct_1 || !statusSelest)
                        throw new Error('Missing elements');
                    usersDepartment.forEach(function (user) {
                        var option = document.createElement('option');
                        option.value = user._id;
                        option.textContent = user.firstName + " " + user.lastName;
                        inChargeSelesct_1.appendChild(option);
                    });
                    // set selected option
                    inChargeSelesct_1.value = inchargesUserId;
                    statusSelest.value = case_.inquiry.status;
                    return [3 /*break*/, 6];
                case 5:
                    error_10 = _a.sent();
                    console.error(error_10);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function formatDate(dateStr) {
    var date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date string
    }
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
function getDepartmentCases(departmentId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/case/get-cases-by-department?departmentId=" + departmentId)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok)
                        throw new Error("cases not found");
                    return [2 /*return*/, data.cases];
                case 3:
                    error_11 = _a.sent();
                    console.error(error_11);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function runAdminFunctions() {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLoggedInUser()];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("user not found");
                    // dubble check if user is admin one here and one with middelware 
                    if (user.role === "admin") {
                        renderUpdateUserBtnPage();
                        renderUpdateDepartmentBtnPage();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function runPersonalFunctions() {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getLoggedInUser()];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("user not found");
                    return [3 /*break*/, 3];
                case 2:
                    error_12 = _a.sent();
                    console.error(error_12);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
runAdminFunctions();
runPersonalFunctions();
renderAllCases();
