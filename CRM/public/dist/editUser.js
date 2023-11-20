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
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data_1, searchQuery_1, searchInput, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('API/user/get-users')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data_1 = _a.sent();
                    if (data_1.ok) {
                        searchQuery_1 = '';
                        searchInput = document.getElementById('searchInput');
                        renderUsersList(data_1.users, '');
                        // Add an event listener to capture changes in the search input field
                        searchInput.addEventListener('input', function (event) {
                            // Update the searchQuery variable with the user's input
                            searchQuery_1 = event.target.value;
                            // Call the renderUsersList function with the updated searchQuery
                            //clear user details
                            clearUserDetails();
                            renderUsersList(data_1.users, searchQuery_1);
                        });
                    }
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
function renderUsersList(users, searchQuery) {
    try {
        if (!users)
            throw new Error('Missing arguments');
        // Filter users based on the search query
        var filteredUsers = users.filter(function (user) {
            var email = user.email + " ";
            return email.toLowerCase().includes(searchQuery.toLowerCase());
        });
        var userList_1 = document.querySelector('#userList');
        if (!userList_1)
            throw new Error('Missing elements');
        userList_1.innerHTML = '';
        if (filteredUsers.length === 0) {
            var noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No matching users found.';
            userList_1.appendChild(noResultsMessage);
        }
        else {
            filteredUsers.forEach(function (user) {
                var userItem = document.createElement('div');
                userItem.classList.add('user-item');
                userItem.textContent = user.email;
                userItem.addEventListener('click', function () {
                    //remove bold class from all users
                    var userItems = document.querySelectorAll('.user-item');
                    userItems.forEach(function (userItem) {
                        userItem.classList.remove('bold-user');
                    });
                    //set bold class to clicked item
                    userItem.classList.add('bold-user');
                    displayUserDetails(user);
                });
                userList_1.appendChild(userItem);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}
function displayUserDetails(user) {
    return __awaiter(this, void 0, void 0, function () {
        var userDetails, deleteUserBtn, updateUserBtn, updatePasswordBtn;
        return __generator(this, function (_a) {
            try {
                userDetails = document.querySelector('#userDetails');
                deleteUserBtn = document.querySelector('#deleteUserBtn');
                updateUserBtn = document.querySelector('#updateUserBtn');
                updatePasswordBtn = document.querySelector('#updatePasswordBtn');
                if (!userDetails || !deleteUserBtn || !updateUserBtn || !updatePasswordBtn)
                    throw new Error('missing elements');
                userDetails.setAttribute('data-user-id', user._id);
                //  deleteUserBtn updateUserBtn display block
                deleteUserBtn.style.display = 'block';
                updateUserBtn.style.display = 'block';
                updatePasswordBtn.style.display = 'block';
                userDetails.innerHTML = "\n        <form id=\"userDetailsForm\">\n        <div class=\"form-group\">\n            <label for=\"firstName\">First Name:</label>\n            <input type=\"text\" id=\"firstName\" value=\"" + user.firstName + "\" placeholder=\"First Name\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"lastName\">Last Name:</label>\n            <input type=\"text\" id=\"lastName\" value=\"" + user.lastName + "\" placeholder=\"Last Name\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"email\">Email:</label>\n            <input type=\"email\" id=\"email\" value=\"" + user.email + "\" placeholder=\"Email\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"phoneNum\">Phone Number:</label>\n            <input type=\"text\" id=\"phoneNum\" value=\"" + user.phoneNum + "\" placeholder=\"Phone Number\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"role\">Role:</label>\n            <select id=\"role\">\n                <option value=\"user\" " + (user.role === 'user' ? 'selected' : '') + ">User</option>\n                <option value=\"admin\" " + (user.role === 'admin' ? 'selected' : '') + ">Admin</option>\n            </select>\n        </div>\n            <divc lass=\"form-group\">\n            <label for=\"department\">Department:</label>\n            <select id=\"department-edit-users\" name=\"department\" required>\n            </select>\n            </div>\n        </form>\n    ";
                populateDepartmentDropdownId(user.department);
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function populateDepartmentDropdownId(departmentId) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentSelect_1, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    departmentSelect_1 = document.querySelector('#department-edit-users');
                    if (!departmentSelect_1)
                        throw new Error('missing elements');
                    return [4 /*yield*/, fetch("API/department/get-departments")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        // Clear existing options
                        departmentSelect_1.innerHTML = '';
                        // Populate the dropdown with options from the API response
                        data.departments.forEach(function (department) {
                            var option = document.createElement('option');
                            option.value = department._id; // You might want to use a unique identifier for each department
                            option.textContent = department.name; // Display the department name
                            departmentSelect_1.appendChild(option);
                            // set selected option
                            if (department._id === departmentId) {
                                option.selected = true;
                            }
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
function deleteUser(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("API/user/delete-user?_id=" + _id, {
                            method: 'DELETE'
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        //Clear user details and user list
                        clearUserDetails();
                        // Refresh user list
                        alert("user deleted  " + data.user.email);
                        fetchUsers();
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
function updateUser(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, lastName, email, phoneNum, role, department, updatedUser, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    firstName = document.querySelector('#firstName').value;
                    lastName = document.querySelector('#lastName').value;
                    email = document.querySelector('#email').value;
                    phoneNum = document.querySelector('#phoneNum').value;
                    role = document.querySelector('#role').value;
                    department = document.querySelector('#department-edit-users').value;
                    if (!firstName || !lastName || !phoneNum || !email || !role || !department)
                        throw new Error('missing some details');
                    updatedUser = {
                        _id: _id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNum: phoneNum,
                        role: role,
                        department: department
                    };
                    return [4 /*yield*/, fetch('API/user/update-user', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedUser)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        // Display a success message or handle the response as needed
                        alert('User updated successfully');
                        clearUserDetails();
                        fetchUsers(); // Refresh the user list
                    }
                    else {
                        // Handle the case where the update was not successful
                        console.error('User update failed:', data.error);
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
function updatePassword(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var password, confirmPassword, updatedUser, response, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    password = document.querySelector('#password').value;
                    confirmPassword = document.querySelector('#confirmPassword').value;
                    if (password !== confirmPassword)
                        throw new Error('passwords not match');
                    updatedUser = {
                        _id: _id,
                        password: password
                    };
                    return [4 /*yield*/, fetch('API/user/update-password', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedUser)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        // Display a success message or handle the response as needed
                        alert('Password updated successfully');
                        clearUserDetails();
                        fetchUsers(); // Refresh the user list
                    }
                    else {
                        // Handle the case where the update was not successful
                        console.error('Password update failed:', data.error);
                    }
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
function renderUpdatePasswordDiv(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var updatePaswordDiv, paswordForm;
        return __generator(this, function (_a) {
            try {
                updatePaswordDiv = document.querySelector('#updatePaswordDiv');
                if (!updatePaswordDiv)
                    throw new Error('missing elements');
                paswordForm = document.createElement('form');
                updatePaswordDiv.innerHTML = '';
                paswordForm.innerHTML = "\n        <div>\n            <label for=\"password\">Password:</label>\n            <input type=\"password\" id=\"password\" placeholder=\"Password\">\n        </div>\n        <div>\n            <label for=\"password\">Confirm Password:</label>\n            <input type=\"password\" id=\"confirmPassword\" placeholder=\"Confirm Password\">\n        </div>\n        <button type=\"submit\">Update Password</button>\n        ";
                updatePaswordDiv.appendChild(paswordForm);
                paswordForm.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updatePassword(_id);
                });
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
// Clear user details and hide delete button
function clearUserDetails() {
    try {
        var userDetails = document.querySelector('#userDetails');
        var userList = document.querySelector('#userList');
        var deleteUserBtn = document.querySelector('#deleteUserBtn');
        var updateUserBtn = document.querySelector('#updateUserBtn');
        var updatePasswordBtn = document.querySelector('#updatePasswordBtn');
        var updatePaswordDiv = document.querySelector('#updatePaswordDiv');
        if (!userDetails || !userList || !deleteUserBtn || !updateUserBtn || !updatePasswordBtn || !updatePaswordDiv)
            throw new Error('missing elements');
        userDetails.innerHTML = '';
        userList.innerHTML = '';
        updatePaswordDiv.innerHTML = '';
        deleteUserBtn.style.display = 'none';
        updateUserBtn.style.display = 'none';
        updatePasswordBtn.style.display = 'none';
    }
    catch (error) {
        console.error(error);
    }
}
// get deparment by id
function getDepartmentById(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("API/department/get-department?_id=" + _id)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.ok) {
                        return [2 /*return*/, data.department.name];
                    }
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
function evantPlay() {
    try {
        window.addEventListener('load', function () {
            fetchUsers();
        });
        var deleteUserBtn = document.querySelector('#deleteUserBtn');
        var updateUserBtn = document.querySelector('#updateUserBtn');
        var updatePasswordBtn = document.querySelector('#updatePasswordBtn');
        if (!deleteUserBtn || !updateUserBtn)
            throw new Error('missing elements');
        deleteUserBtn.addEventListener('click', function () {
            // Get the currently displayed user and delete it
            var userDetails = document.querySelector('#userDetails');
            var userId = userDetails.getAttribute('data-user-id'); // Store user ID as an attribute
            if (userId) {
                deleteUser(userId);
            }
        });
        updateUserBtn.addEventListener('click', function () {
            // Get the currently displayed user and delete it
            var userDetails = document.querySelector('#userDetails');
            var userId = userDetails.getAttribute('data-user-id'); // Store user ID as an attribute
            if (userId) {
                updateUser(userId);
            }
        });
        updatePasswordBtn.addEventListener('click', function () {
            // Get the currently displayed user and delete it
            var userDetails = document.querySelector('#userDetails');
            var userId = userDetails.getAttribute('data-user-id'); // Store user ID as an attribute
            if (userId) {
                renderUpdatePasswordDiv(userId);
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
evantPlay();
