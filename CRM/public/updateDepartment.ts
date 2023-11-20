async function hundleSubmitDepartment(ev) {
    try {
        ev.preventDefault();
        const departmentName = ev.target.departmentName.value;
        const phoneNum = ev.target.phoneNum.value;
        const departmentManager = ev.target.departmentManager.value;
        const managerPhone = ev.target.managerPhone.value;
        if (!departmentName || !phoneNum) throw new Error("One or more fields are missing");
        const department = {
            name: departmentName,
            phoneNum: phoneNum,
            departmentManager: departmentManager,
            managerPhoneNum: managerPhone
        }
        console.log(department);
        const response = await fetch("/API/department/add-department", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(department)
        });
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        window.location.href = "updateDepartment.html";
    } catch (error) {
        console.error(error);
    }
}

async function hundleSubmitDeleteDepartment(ev) {
    try {
        ev.preventDefault();
        const departmentId = ev.target.department.value;
        const answer = confirm(`Are you sure you want to delete this department?`);
        if (!answer) return;
        if (!departmentId) throw new Error("One or more fields are missing");
        const response = await fetch(`/API/department/delete-department?_id=${departmentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        window.location.href = "updateDepartment.html";
    } catch (error) {
        console.error(error);
    }
}

async function hundleSubmitEditDepartment(ev) {
    try {
        ev.preventDefault();
        console.log(`hundleSubmitEditDepartment`);
        const departmentId = ev.target.department.value;
        const departmentName = ev.target.departmentName.value;
        const phoneNum = ev.target.phoneNum.value;
        const departmentManager = ev.target.departmentManager.value;
        const managerPhone = ev.target.managerPhone.value;
        if (!departmentName || !phoneNum) throw new Error("One or more fields are missing");
        const department = {
            _id: departmentId,
            name: departmentName,
            phoneNum: phoneNum,
            departmentManager: departmentManager,
            managerPhoneNum: managerPhone
        }
        console.log(department);
        const response = await fetch("/API/department/update-department", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(department)
        });
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        window.location.href = "updateDepartment.html";
    } catch (error) {
        console.error(error);
    }
}

function renderViewForm() {
    try {
        console.log(`renderViewForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        let formHTML = `<div class="form-container">
        <h2 class="form-heading">View Department</h2>
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Department Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Department Manager</th>
            <th scope="col">Manager Phone Number</th>
          </tr>
        </thead>
        <tbody>`;
        fetch("/API/department/get-departments")
            .then((response) => {
                if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                const departments = data.departments;
                departments.forEach((department) => {
                    formHTML += `<tr>
                    <td>${department.name}</td>
                    <td>${department.phoneNum}</td>
                    <td>${department.departmentManager}</td>
                    <td>${department.managerPhoneNum}</td>
                  </tr>`;
                });
                formHTML += `</tbody>
                </table>
                </div>`;
                form.innerHTML = formHTML;
            });
    } catch (error) {
        console.error(error);
    }
}

async function renderDeleteForm() {
    try {
        console.log(`renderDeleteForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        let formHTML = `<div class="form-container">
        <h2 class="form-heading">Delete Department</h2>
        <form onsubmit="hundleSubmitDeleteDepartment(event)">
        <div class="form-group">
            <label for="department" class="label">Select Department</label>
            <select class="form-control" id="department">
            <option value="" disabled selected>Select Department</option>`
        const response = await fetch("/API/department/get-departments");
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        const data = await response.json();
        const departments = data.departments;
        departments.forEach((department) => {
            formHTML += `<option value="${department._id}">${department.name}</option>`;
        }
        );
        formHTML += `</select>
        </div>
        <button type="submit" class="btn btn-primary">Delete</button>
        </form>
        </div>`;
        form.innerHTML = formHTML;
    } catch (error) {
        console.error(error);
    }
}

function renderAddNewForm() {
    try {
        console.log(`renderAddNewForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        const formHTML = `<div class="form-container">
        <h2 class="form-heading">Add New Department</h2>
        <form onsubmit="hundleSubmitDepartment(event)">
          <div class="form-group">
            <label for="departmentName" class="label">*Department Name</label>
            <input type="text" class="form-control" id="departmentName" placeholder="Enter Department Name" required>
          </div>
          <div class="form-group">
            <label for="phoneNum" class="label">*Phone Number</label>
            <input type="text" class="form-control" id="phoneNum" placeholder="Enter Phone Number" required>
          </div>
          <div class="form-group">
            <label for="departmentManager" class="label">Department Manager</label>
            <input type="text" class="form-control" id="departmentManager" placeholder="Enter Department Manager">
          </div>
          <div class="form-group">
            <label for="managerPhone" class="label">Manager Phone Number</label>
            <input type="text" class="form-control" id="managerPhone" placeholder="Enter Phone Number">
           </div>
          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>`;
        form.innerHTML = formHTML;
    } catch (error) {
        console.error(error);
    }

}


async function renderEditForm() {
    try {
        console.log(`renderEditForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        let formHTML = `<div class="form-container">
        <h2 class="form-heading">Edit Department</h2>
        <form onsubmit="hundleSubmitEditDepartment(event)">
        <div class="form-group">
            <label for="department" class="label">Select Department</label>
            <select class="form-control" id="department" onchange="loadDepartmentInfo()">
            <option value="" disabled selected>Select Department</option>
            `;
        const response = await fetch("/API/department/get-departments");
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        const data = await response.json();
        const departments = data.departments;
        departments.forEach((department) => {
            formHTML += `<option value="${department._id}">${department.name}</option>`;
        });
        formHTML += `</select>
        </div>
        <div class="form-group">
            <label for="departmentName" class="label">*Department Name</label>
            <input type="text" class="form-control" id="departmentName" placeholder="Department Name" required>
        </div>
        <div class="form-group">
            <label for="phoneNum" class="label">*Phone Number</label>
            <input type="text" class="form-control" id="phoneNum" placeholder="Phone Number" required>
        </div>
        <div class="form-group">
            <label for="departmentManager" class="label">Department Manager</label>
            <input type="text" class="form-control" id="departmentManager" placeholder="Department Manager">
        </div>
        <div class="form-group">
            <label for="managerPhone" class="label">Department Manager Phone Number</label>
            <input type="text" class="form-control" id="managerPhone" placeholder="Department Manager Phone Number">
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
        </form>
        </div>`;
        form.innerHTML = formHTML;

    } catch (error) {
        console.error(error);
    }
}

async function loadDepartmentInfo() {
    try {
        const departmentId = document.querySelector<HTMLInputElement>("#department").value;
        console.log(departmentId);
        const response = await fetch(`/API/department/get-department?_id=${departmentId}`);
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        const department = data.department;
        const departmentName = document.querySelector<HTMLInputElement>("#departmentName");
        const phoneNum = document.querySelector<HTMLInputElement>("#phoneNum");
        const departmentManager = document.querySelector<HTMLInputElement>("#departmentManager");
        const managerPhone = document.querySelector<HTMLInputElement>("#managerPhone");
        departmentName.value = department.name;
        phoneNum.value = department.phoneNum;
        departmentManager.value = department.departmentManager;
        managerPhone.value = department.managerPhoneNum;

    } catch (error) {
        console.error(error);
    }
}