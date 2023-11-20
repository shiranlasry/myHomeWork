
async function hundleSubmitTitle(event) {
    try {
        event.preventDefault();
        console.log(`hundleSubmitTitle`);
        const title = event.target.elements.title.value;
        const department = document.querySelector<HTMLInputElement>("#departmentTitle").value;
        console.log(title, department);
        const response = await fetch("/API/title/add-title", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, department }),
        });
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        window.location.href = "updateTitle.html";
    } catch (error) {
        console.error(error);
    }

}

async function hundleSubmitEditTitle(event) {
    try {
        event.preventDefault();
        console.log(`hundleSubmitEditTitle`);
        const _id = document.querySelector<HTMLInputElement>("#oldTitle").value;
        const title = event.target.elements.newTitle.value;
        const department = document.querySelector<HTMLInputElement>("#departmentTitleNew").value;
        console.log(_id, title, department);
        const response = await fetch("/API/title/update-title", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id, title: title, department: department }),
        });
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        window.location.href = "updateTitle.html";
    } catch (error) {
        console.error(error);
    }
}

async function hundleDeleteTitle(event) {
    try {
        event.preventDefault();
        console.log(`hundleDeleteTitle`);
        const _id = document.querySelector<HTMLInputElement>("#title").value;
        const response = await fetch(`/API/title/delete-title?_id=${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id }),
        });
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        window.location.href = "updateTitle.html";
    } catch (error) {
        console.error(error);
    }
}

async function renderDeleteTitleForm() {
    try {
        console.log(`renderDeleteTitleForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        let formHTML = `<div class="form-container">
            <h2 class="form-heading">Delete Title</h2>
            <form onsubmit="hundleDeleteTitle(event)">
                <div class="form-group">
                    <label for="title" class="label">* Title</label>
                    <select class="form-control" id="title" required>
                        <option value="" disabled selected>Select Title</option>`;
        const responseUser = await fetch("/API/user/get-logged-user");
        const dataUser = await responseUser.json();
        const user = dataUser.user;
        if (user.role === "admin") {
            const response = await fetch("/API/title/get-titles");
            const data = await response.json();
            const titles = data.titles;
            titles.forEach(title => {
                formHTML += `<option value="${title._id}">${title.title}</option>`;
            });
        }
        else {
            const response = await fetch(`/API/title/get-titles?department=${user.department}`);
            const data = await response.json();
            const titles = data.titles;
            titles.forEach(title => {
                formHTML += `<option value="${title._id}">${title.title}</option>`;
            });
        }

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

async function renderViewTitlesForm() {
    try {
        console.log(`renderViewTitlesForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        let formHTML = `<div class="form-container">
            <h2 class="form-heading">View Titles</h2>
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Department</th>
                </tr>
            </thead>
            <tbody>`;
        const responseUser = await fetch("/API/user/get-logged-user");
        const dataUser = await responseUser.json();
        const user = dataUser.user;
        if (user.role === "admin") {
            const response = await fetch("/API/title/get-titles");
            const data = await response.json();
            const titles = data.titles;
            await Promise.all(
                titles.map(async (title) => {
                    const departmentName = await getDepartmentName(title.department);
                    formHTML += `<tr>
                    <td>${title.title}</td>
                    <td>${departmentName}</td>
                </tr>`;
                })
            );
        }
        else {
            const response = await fetch(`/API/title/get-titles?department=${user.department}`);
            const data = await response.json();
            const titles = data.titles;
            await Promise.all(
                titles.map(async (title) => {
                    const departmentName = await getDepartmentName(title.department);
                    formHTML += `<tr>
                    <td>${title.title}</td>
                    <td>${departmentName}</td>
                </tr>`;
                })
            );
        }
        formHTML += `</tbody>
            </table>
            </div>`;
        form.innerHTML = formHTML;
    } catch (error) {
        console.error(error);
    }
}



async function renderOldTitle() {
    try {
        let formHTML = `<div class="form-container">
            <h2 class="form-heading">Edit Title</h2>
            <form onsubmit="hundleSubmitEditTitle(event)">
                <div class="form-group">
                    <label for="oldTitle" class="label">* Old Title</label>
                    <select class="form-control" id="oldTitle" required onchange="loadDepartmentName()">
                        <option value="" disabled selected>Select Title</option>`;
        const responseUser = await fetch("/API/user/get-logged-user");
        const dataUser = await responseUser.json();
        const user = dataUser.user;
        if (user.role === "admin") {
            const response = await fetch("/API/title/get-titles");
            const data = await response.json();
            const titles = data.titles;
            titles.forEach(title => {
                formHTML += `<option value="${title._id}">${title.title}</option>`;
            });
        }
        else {
            const response = await fetch(`/API/title/get-titles?department=${user.department}`);
            const data = await response.json();
            const titles = data.titles;
            titles.forEach(title => {
                formHTML += `<option value="${title._id}">${title.title}</option>`;
            });
        }

        formHTML += `</select>
            </div>
            <div class="form-group">
                <label for="departmentTitleOld" class="label">Old Department</label>
                <input type="text" class="form-control" id="departmentTitleOld" placeholder="Department" readOnly>
            </div>`;

        return formHTML;
    } catch (error) {
        console.error(error);
    }
}

async function renderNewTitle() {
    try {
        let formHTML = `<div class="form-group">
                <label for="newTitle" class="label">* New Title</label>
                <input type="text" class="form-control" id="newTitle" placeholder="Enter New Title" required>
            </div>
            <div class="form-group">
                <label for="departmentTitleNew" class="label">* Select Department</label>
                <select class="form-control" id="departmentTitleNew" required>
                    <option value="" disabled selected>Select Department</option>`;
        const responseUser = await fetch("/API/user/get-logged-user");
        const dataUser = await responseUser.json();
        const user = dataUser.user;
        if (user.role === "admin") {
            const response = await fetch("/API/department/get-departments");
            const data = await response.json();
            const departments = data.departments;
            console.log(departments);
            departments.forEach(department => {
                formHTML += `<option value="${department._id}">${department.name}</option>`;
            });
        }
        else {
            const department = await getDepartmentName(user.department);
            formHTML += `<option value="${user.department}">${department}</option>`;
        }
        // const response = await fetch("/API/department/get-departments");
        // const data2 = await response.json();
        // const departments = data2.departments;
        // departments.forEach(department => {
        //     formHTML += `<option value="${department._id}">${department.name}</option>`;
        // });

        formHTML += `</select>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            </form>
            </div>`;
        return formHTML;
    } catch (error) {
        console.error(error);
    }
}

async function renderEditTitleForm() {
    try {
        console.log(`renderUpdateTitleForm`);
        const form = document.getElementById("formDiv");
        if (!form) throw new Error("Form div not found");
        let formHTML = await renderOldTitle();
        formHTML += await renderNewTitle();
        form.innerHTML = formHTML;

    } catch (error) {
        console.error(error);
    }
}

async function renderAddNewTitleForm() {
    try {
        try {
            console.log(`renderAddNewTitleForm`);
            const form = document.getElementById("formDiv");
            if (!form) throw new Error("Form div not found");
            let formHTML = `<div class="form-container">
            <h2 class="form-heading">Add New Title</h2>
            <form onsubmit="hundleSubmitTitle(event)">
                <div class="form-group">
                    <label for="title" class="label">* Title</label>
                    <input type="text" class="form-control" id="title" placeholder="Enter Title" required>
                </div>
                <div class="form-group">
                    <label for="departmentTitle" class="label">* Select Department</label>
                    <select class="form-control" id="departmentTitle" required>
                        <option value="" disabled selected>Select Department</option>`;
            const responseUser = await fetch("/API/user/get-logged-user");
            const dataUser = await responseUser.json();
            const user = dataUser.user;
            if (user.role === "admin") {
                const response = await fetch("/API/department/get-departments");
                const data = await response.json();
                const departments = data.departments;
                console.log(departments);
                departments.forEach(department => {
                    formHTML += `<option value="${department._id}">${department.name}</option>`;
                });
            }
            else {
                const department = await getDepartmentName(user.department);
                formHTML += `<option value="${user.department}">${department}</option>`;
            }

            formHTML += `</select>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
            </div>`;
            form.innerHTML = formHTML;
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadDepartmentName() {
    try {
        const _id = document.querySelector<HTMLInputElement>("#oldTitle").value;
        const response = await fetch(`/API/title/get-title?_id=${_id}`);
        const data = await response.json();
        const departmentTitle = data.title;
        const departmentID = departmentTitle.department;
        document.querySelector<HTMLInputElement>("#departmentTitleOld").value = await getDepartmentName(departmentID);
    } catch (error) {
        console.error(error);
    }
}

async function getDepartmentName(_id) {
    try {
        const response = await fetch(`/API/department/get-department?_id=${_id}`);
        const data = await response.json();
        const department = data.department;
        return department.name;
    } catch (error) {
        console.error(error);
    }
}