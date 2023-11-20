async function fetchUsers() {
    try {
        const response = await fetch('API/user/get-users'); // Assuming your API endpoint is '/api/get-users'
        const data = await response.json();
      
        if (data.ok) {
          // Define a variable to store the search query
        let searchQuery = '';

        // Access the search input field by its ID
        const searchInput = document.getElementById('searchInput');
        renderUsersList(data.users, '');
        // Add an event listener to capture changes in the search input field
        searchInput.addEventListener('input', (event) => {
            // Update the searchQuery variable with the user's input
            searchQuery = event.target.value;

            // Call the renderUsersList function with the updated searchQuery
            //clear user details
            clearUserDetails();
    
            renderUsersList(data.users, searchQuery);  
            
        });
        }
    } catch (error) {
        console.error(error);
    }
}
function renderUsersList(users, searchQuery) {
    try {
        if (!users) throw new Error('Missing arguments');
         // Filter users based on the search query
         const filteredUsers = users.filter((user) => {
            const email = `${user.email} `;
            return email.toLowerCase().includes(searchQuery.toLowerCase());
        });
        const userList = document.querySelector('#userList');
        if (!userList) throw new Error('Missing elements');
        userList.innerHTML = '';

        if (filteredUsers.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No matching users found.';
            userList.appendChild(noResultsMessage);
        } else {
            filteredUsers.forEach((user) => {
                const userItem = document.createElement('div');
                userItem.classList.add('user-item');
                userItem.textContent = user.email;
                userItem.addEventListener('click', () => {
                    //remove bold class from all users
                    const userItems = document.querySelectorAll('.user-item');
                    userItems.forEach((userItem) => {
                        userItem.classList.remove('bold-user');
                    });
                    //set bold class to clicked item
                    userItem.classList.add('bold-user');
                    displayUserDetails(user);
                });
                userList.appendChild(userItem);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayUserDetails(user) {
    try {
        const userDetails = document.querySelector('#userDetails');
        const deleteUserBtn = document.querySelector('#deleteUserBtn');
        const updateUserBtn = document.querySelector('#updateUserBtn'); 
        const updatePasswordBtn = document.querySelector('#updatePasswordBtn');
        if (!userDetails || !deleteUserBtn ||!updateUserBtn ||!updatePasswordBtn ) throw new Error('missing elements');
    
        userDetails.setAttribute('data-user-id', user._id);
    //  deleteUserBtn updateUserBtn display block
        deleteUserBtn.style.display = 'block';
        updateUserBtn.style.display = 'block';
        updatePasswordBtn.style.display = 'block';  
        
        userDetails.innerHTML = `
        <form id="userDetailsForm">
        <div class="form-group">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" value="${user.firstName}" placeholder="First Name">
        </div>
        <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" value="${user.lastName}" placeholder="Last Name">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" value="${user.email}" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="phoneNum">Phone Number:</label>
            <input type="text" id="phoneNum" value="${user.phoneNum}" placeholder="Phone Number">
        </div>
        <div class="form-group">
            <label for="role">Role:</label>
            <select id="role">
                <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
        </div>
            <divc lass="form-group">
            <label for="department">Department:</label>
            <select id="department-edit-users" name="department" required>
            </select>
            </div>
        </form>
    `;
    
    populateDepartmentDropdownId(user.department);
    } catch (error) {
        console.error(error);
    }
   
}
async function populateDepartmentDropdownId(departmentId) {
    try {
        const departmentSelect = document.querySelector('#department-edit-users');
        if (!departmentSelect) throw new Error('missing elements');

        // Make an API request to fetch department options
        const response = await fetch("API/department/get-departments");
        const data = await response.json();

        if (data.ok) {
            // Clear existing options
            departmentSelect.innerHTML = '';

            // Populate the dropdown with options from the API response
            data.departments.forEach((department) => {
                const option = document.createElement('option');
                option.value = department._id; // You might want to use a unique identifier for each department
                option.textContent = department.name; // Display the department name
                departmentSelect.appendChild(option);
                // set selected option
                if (department._id === departmentId) {
                    option.selected = true; 
                }

            });
        } else {
            console.error("Failed to fetch department options");
        }
    } catch (error) {
        console.error(error);
    }
}
async function deleteUser(_id) {
    try {
        
        const response = await fetch(`API/user/delete-user?_id=${_id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (data.ok) {
            //Clear user details and user list
           clearUserDetails();
            // Refresh user list
            alert("user deleted  "+ data.user.email)
            fetchUsers();
        }
    } catch (error) {
        console.error(error);
    }
}
async function updateUser(_id) {
    try {
        // Get the updated values from the input fields
      
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const email = document.querySelector('#email').value; 
        const phoneNum = document.querySelector('#phoneNum').value;
        const role = document.querySelector('#role').value;
        const department = document.querySelector('#department-edit-users').value;
        if (!firstName || !lastName || !phoneNum || !email || !role || !department)
            throw new Error('missing some details');

        // Create an object with the updated data
        const updatedUser = {
            _id,
            firstName,
            lastName,
            email,
            phoneNum,
            role,
            department
        };

        // Send a PUT or POST request to your server to update the user data
        const response = await fetch('API/user/update-user', {
            method: 'PATCH', // or 'POST' depending on your server route
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        const data = await response.json();
        if (data.ok) {
            // Display a success message or handle the response as needed
            alert('User updated successfully');
            clearUserDetails();
            fetchUsers(); // Refresh the user list
        } else {
            // Handle the case where the update was not successful
            console.error('User update failed:', data.error);
        }
    } catch (error) {
        console.error(error);
    }
}
async function updatePassword(_id) {
    try {
        // Get the updated values from the input fields
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;
        if (password !== confirmPassword) throw new Error('passwords not match');
        // Create an object with the updated data
        const updatedUser = {
            _id,
            password
        };

        // Send a PUT or POST request to your server to update the user data
        const response = await fetch('API/user/update-password', {
            method: 'PATCH', // or 'POST' depending on your server route
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        const data = await response.json();
        if (data.ok) {
            // Display a success message or handle the response as needed
            alert('Password updated successfully');
            clearUserDetails();
            fetchUsers(); // Refresh the user list
        } else {
            // Handle the case where the update was not successful
            console.error('Password update failed:', data.error);
        }
    } catch (error) {
        console.error(error);
    }
}
async function renderUpdatePasswordDiv(_id) {
    try {
        const updatePaswordDiv= document.querySelector('#updatePaswordDiv');    
        if (!updatePaswordDiv) throw new Error('missing elements');
        const paswordForm = document.createElement('form');
        updatePaswordDiv.innerHTML = '';
        paswordForm.innerHTML = `
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password">
        </div>
        <div>
            <label for="password">Confirm Password:</label>
            <input type="password" id="confirmPassword" placeholder="Confirm Password">
        </div>
        <button type="submit">Update Password</button>
        `;
        updatePaswordDiv.appendChild(paswordForm);
        paswordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            updatePassword(_id); 
        });

       
       
        
    } catch (error) {
        console.error(error);
    }
 
}
// Clear user details and hide delete button
function clearUserDetails() {
    try {
        const userDetails = document.querySelector('#userDetails');
        const userList = document.querySelector('#userList');
        const deleteUserBtn = document.querySelector('#deleteUserBtn');
        const updateUserBtn = document.querySelector('#updateUserBtn'); 
        const updatePasswordBtn = document.querySelector('#updatePasswordBtn');
        const updatePaswordDiv= document.querySelector('#updatePaswordDiv');
        if (!userDetails || !userList || !deleteUserBtn   || !updateUserBtn || !updatePasswordBtn  || !updatePaswordDiv )
         throw new Error('missing elements');

        userDetails.innerHTML = ''; 
        userList.innerHTML = '';
        updatePaswordDiv.innerHTML = '';    
        deleteUserBtn.style.display = 'none';
        updateUserBtn.style.display = 'none';
        updatePasswordBtn.style.display = 'none';
    } catch (error) {
        console.error(error);
    }
}

// get deparment by id
async function getDepartmentById(_id) {
    try {
        const response =await fetch(`API/department/get-department?_id=${_id}`);
        const data = await response.json();
        if (data.ok) {
            return data.department.name;
        }
    } catch (error) {
        console.error(error);
    }
}
function evantPlay(){
    try {
       
        window.addEventListener('load', () => {
            fetchUsers();
        });
        
        const deleteUserBtn = document.querySelector('#deleteUserBtn');
        const updateUserBtn = document.querySelector('#updateUserBtn'); 
        const updatePasswordBtn = document.querySelector('#updatePasswordBtn');
        if (!deleteUserBtn ||!updateUserBtn) throw new Error('missing elements');
        
        deleteUserBtn.addEventListener('click', () => {
        // Get the currently displayed user and delete it
        const userDetails = document.querySelector('#userDetails');
        const userId = userDetails.getAttribute('data-user-id'); // Store user ID as an attribute
        if (userId) {
         deleteUser(userId);}  
});
updateUserBtn.addEventListener('click', () => {
    // Get the currently displayed user and delete it
    const userDetails = document.querySelector('#userDetails');
    const userId = userDetails.getAttribute('data-user-id'); // Store user ID as an attribute
    if (userId) {
        updateUser(userId);}
});
updatePasswordBtn.addEventListener('click', () => {
    // Get the currently displayed user and delete it
    const userDetails = document.querySelector('#userDetails');
    const userId = userDetails.getAttribute('data-user-id'); // Store user ID as an attribute
    if (userId) {
        renderUpdatePasswordDiv(userId);}
});
        
    } catch (error) {
        console.error(error);
    }
   
}

evantPlay();


