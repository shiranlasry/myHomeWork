async function hundleRegister(event) {
    try {

        event.preventDefault();
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const phoneNum = event.target.phoneNum.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const isAdminCheckbox = event.target.querySelector('#isAdmin');
        const role = isAdminCheckbox.checked ? "admin" : "user";
        // Get the selected department from the dropdown
        // const departmentSelect = event.target.querySelector('#department-register');
        // const department = departmentSelect.value;
        const department = event.target.querySelector('#department-register').value;

        const user = { email, password, firstName, lastName, phoneNum, role, department };
        if (!user.firstName || !user.lastName || !user.phoneNum || !user.email || !user.password || !user.role || !user.department)
            throw new Error("missing some details");
        const response = await fetch("API/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!data.ok) {
            alert(data.error);
            throw new Error(data.error);
        }
        alert("user created");
        window.location.href = `updateUsers.html`;
    }
    catch (error) {
        console.error(error);
    }

}

// Fetch department options from the server API and populate the dropdown
async function populateDepartmentDropdown() {
    try {
        const departmentSelect = document.querySelector('#department-register');
        if (!departmentSelect) throw new Error("Department dropdown not found");
        ; // No department dropdown in this page, so exit the function without a
       
        // Make an API request to fetch department options
        const response = await fetch("API/department/get-departments");
        const data = await response.json();

        if (data.ok) {
            // Clear existing options
            departmentSelect.innerHTML = '<option value="">Select a department</option>';

            // Populate the dropdown with options from the API response
            data.departments.forEach((department) => {
                const option = document.createElement('option');
                option.value = department._id; // You might want to use a unique identifier for each department
                option.textContent = department.name; // Display the department name
                departmentSelect.appendChild(option);
            });
        } else {
            console.error("Failed to fetch department options");
        }
    } catch (error) {
        console.error(error);
    }
}
populateDepartmentDropdown();  