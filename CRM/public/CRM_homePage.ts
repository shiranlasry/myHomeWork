//homepage ts

// get current user from server cookie
async function getLoggedInUser() {
    try {
        const response = await fetch("/API/user/get-logged-user");
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error(error);
        return null; // Return null on error
    }
}
async function LogOut() {
    try {
        const response = await fetch("API/user/log-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

        });
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        alert("You are logged out");
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        return null; // Return null on error
    }
}
// render update user button for open page - for admin only
function renderUpdateUserBtnPage() {
    const updateUserDiv = document.querySelector("#updateUserDiv");
    const updateUserBtn = document.createElement("button");
    updateUserDiv.appendChild(updateUserBtn);
    updateUserBtn.innerText = "Update Users";
    //pn click go to update users page
    updateUserBtn.addEventListener("click", () => {
        window.location.href = "updateUsers.html";
    });
}

// render update department button for open page - for admin only
function renderUpdateDepartmentBtnPage() {
    const updateDepartmentDiv = document.querySelector("#updateDepartmentDiv");
    const updateDepartmentBtn = document.createElement("button");
    updateDepartmentDiv.appendChild(updateDepartmentBtn);
    updateDepartmentBtn.innerText = "Update Departments";
    //pn click go to update departments page
    updateDepartmentBtn.addEventListener("click", () => {
        window.location.href = "updateDepartment.html";
    });
}

// render update title button for open page - for admin only
function renderUpdateTitleBtnPage() {
    const updateTitleDiv = document.querySelector("#updateTitleDiv");
    const updateTitleBtn = document.createElement("button");
    updateTitleDiv.appendChild(updateTitleBtn);
    updateTitleBtn.innerText = "Update Titles";
    //pn click go to update titles page
    updateTitleBtn.addEventListener("click", () => {
        window.location.href = "updateTitle.html";
    });
}

function renderPersonalInfoPage() {

    window.location.href = "personalInfo.html";

}
function renderAddNewCasePage() {

    window.location.href = "addNewCase.html";

}

async function renderAllCases() {
    try {
        // get user from server
        const user = await getLoggedInUser();
        if (!user) throw new Error("user not found");

        // get departments by user id from server if moked get all if not get by user id
        const response = await fetch(`/API/department/get-departments-by-userId?departmentId=${user.department}`);
        const data = await response.json();
        if (data.ok) {
            const globalCases = [];
            // Use Promise.all to await all departmentCases
            await Promise.all(data.departments.map(async (department) => {
                const departmentCases = await getDepartmentCases(department._id);
                if (departmentCases) {
                    globalCases.push(...departmentCases);
                }
            }));

            console.log(`globalCases: `, globalCases);
            //render cases list
            let searchQuery = '';

            // Access the search input field by its ID
            const searchInput = document.querySelector('#searchInputCase');
            renderCasesList(globalCases, '');
            // Add an event listener to capture changes in the search input field
            searchInput.addEventListener('input', (event) => {
                // Update the searchQuery variable with the user's input
                searchQuery = event.target.value;

                // cleare case details

                const caseDetailsDiv = document.querySelector("#case-details");
                if (!caseDetailsDiv) throw new Error('Missing elements');
                caseDetailsDiv.innerHTML = '';
                renderCasesList(globalCases, searchQuery);

            });

        }
    } catch (error) {
        console.error(error);
    }
}

async function renderMyCases() {
    try {
        // get user from server
        const user = await getLoggedInUser();
        if (!user) throw new Error("user not found");
        console.log(user._id);
        // get departments by user id from server if moked get all if not get by user id
        const response = await fetch(`/API/case/get-cases-by-userId?userId=${user._id}`);
        const data = await response.json();
        const myCases = data.cases;
        if (!myCases) throw new Error("cases not found");
        let searchQuery = '';

        // Access the search input field by its ID
        const searchInput = document.querySelector('#searchInputCase');
        renderCasesList(myCases, '');
        // Add an event listener to capture changes in the search input field
        searchInput.addEventListener('input', (event) => {
            // Update the searchQuery variable with the user's input
            searchQuery = event.target.value;

            // cleare case details

            const caseDetailsDiv = document.querySelector("#case-details");
            if (!caseDetailsDiv) throw new Error('Missing elements');
            caseDetailsDiv.innerHTML = '';
            renderCasesList(myCases, searchQuery);

        });

    } catch (error) {
        console.error(error);
    }
}

async function renderCasesList(cases, searchQuery) {
    try {
        if (!cases) throw new Error("no cases to render");

        const casesListDiv = document.querySelector("#casesList");

        if (!casesListDiv) throw new Error('Missing elements');
        casesListDiv.innerHTML = '';
        const filteredCases = cases.filter((case_) => {
            const orderNumber = `${case_.orderNumber} `;
            return orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
        });
        if (filteredCases.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No matching cases found.';
            casesListDiv.appendChild(noResultsMessage);
        } else {
            filteredCases.forEach((case_) => {
                const case_Item = document.createElement('div');
                const case_number = document.createElement('div');
                const case_discription = document.createElement('div');
                const case_createDate = document.createElement('div');

                case_Item.classList.add('case-item');

                case_number.textContent = case_.orderNumber;
                case_discription.textContent = case_.inquiry.description;
                case_createDate.textContent = formatDate(case_.inquiry.recivedDate);
                case_Item.addEventListener('click', () => {
                    //remove bold class from all users
                    const caseItems = document.querySelectorAll('.case-item');
                    caseItems.forEach((caseItem) => {
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
                casesListDiv.appendChild(case_Item);

            });
        }

    } catch (error) {
        console.error(error);
    }
}
async function getDepartmentName(_id) {
    try {

        //fetch get department name and send department id
        const response = await fetch(`/API/department/get-department-name?_id=${_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }

        const data = await response.json();
        return data.departmentName;


    } catch (error) {
        console.error(error)
    }
}
async function getTitleName(_id) {
    try {

        //fetch get Title name and send Title id
        const response = await fetch(`/API/title/get-title-name?_id=${_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }

        const data = await response.json();

        return data.title;


    } catch (error) {
        console.error(error)
    }
}
async function getUsersDepartment(_id) {
    try {

        if (!_id) throw new Error("no department id");
        // get users by department id from server
        const response = await fetch(`/API/user/get-users-by-department?department=${_id}`);
        const data = await response.json();
        if (!data.ok) throw new Error("users not found");
        return data.users;

    } catch (error) {
        console.error(error)
    }
}
async function getComplainanDetails(complainantId) {
    const response = await fetch(`/API/complainant/get-complainant-by-id?_id=${complainantId}`);
    const data = await response.json();
    if (!data.ok) throw new Error("complainant not found");
    return data.complainant;
}
function clearCaseDetails() {
    const caseDetailsDiv = document.querySelector("#caseDetails");
    const updateCaseBtn = document.querySelector('#updateCaseBtn') as HTMLButtonElement;
    const deleteCaseBtn = document.querySelector('#deleteCaseBtn') as HTMLButtonElement;
    const complainanDetailsPopUpDiv = document.querySelector('#complainanDetailsPopUpDiv') as HTMLDivElement;
    const showcomplainanDetailsBtn = document.querySelector('#showcomplainanDetailsBtn')as HTMLButtonElement;
    if (!updateCaseBtn || !deleteCaseBtn || !showcomplainanDetailsBtn || !complainanDetailsPopUpDiv ) throw new Error('Missing elements');
    updateCaseBtn.style.display = 'none';
    deleteCaseBtn.style.display = 'none';
    showcomplainanDetailsBtn.style.display = 'none';

    if (!caseDetailsDiv) throw new Error('Missing elements');
    caseDetailsDiv.innerHTML = '';
    complainanDetailsPopUpDiv.innerHTML = '';
    complainanDetailsPopUpDiv.style.display = 'none';
}
function popUpComplainanDetails(complainant) {
    // get complainan details from server
    try {
        // pop up with complainan details from case.complainantId
        const complainanDetailsPopUpDiv = document.querySelector('#complainanDetailsPopUpDiv') ;
        if (!complainanDetailsPopUpDiv) throw new Error('Missing elements -complainanDetailsPopUpDiv');
        complainanDetailsPopUpDiv.innerHTML = '';
        complainanDetailsPopUpDiv.style.display = 'block';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', () => {
            complainanDetailsPopUpDiv.innerHTML = '';
            complainanDetailsPopUpDiv.style.display = 'none';    
        });
        complainanDetailsPopUpDiv.appendChild(closeBtn);
        const complainanDetails = document.createElement('div');
        complainanDetails.classList.add('complainan-details');
        complainanDetails.innerHTML = `
        <h1>Complainan Details</h1>
        <div class="form-group case-group">
            <label>First Name : ${complainant.firstName}</label>
        </div>
        <div class="form-group case-group">
            <label>Last Name : ${complainant.lastName}</label>
        </div>
        <div class="form-group case-group">
            <label>Phone Number : ${complainant.phoneNum}</label>
        </div>
        <div class="form-group case-group">
            <label>Street : ${complainant.street ?complainant.street :'---'}</label>
        </div>
        <div class="form-group case-group">
            <label>House Number : ${complainant.houseNum ?complainant.houseNum :'---'}</label>
        </div>
        <div class="form-group case-group">
            <label>Apartment Number : ${complainant.apartmentNum ?complainant.apartmentNum :'---'}</label>
        </div>
        `;
        complainanDetailsPopUpDiv.appendChild(complainanDetails);

    } catch (error) {
        console.error(error);
    }

}

async function deleteCase() {
    try {
        const caseDetails = document.querySelector('#caseDetails');
        if (!caseDetails) throw new Error('Missing elements');
        const userId = caseDetails.getAttribute('data-case-id');
        const response = await fetch(`/API/case/delete-case?_id=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!data.ok) throw new Error("case not found");
        alert("case deleted");
        window.location.href = "CRM_homePage.html";
    } catch (error) {
        console.error(error);
    }
}

async function updateCase(inquiry_id , case_id) {
    try {
        if (!inquiry_id || !case_id) throw new Error('Missing elements');
        const caseDetails = document.querySelector('#caseDetails');
        if (!caseDetails) throw new Error('Missing elements');
        const userId = caseDetails.getAttribute('data-case-id');
        const inChargeSelesct = document.querySelector('#inChargeSelesct') as HTMLSelectElement;
        const statusSelest = document.querySelector('#statusSelest') as HTMLSelectElement;
        const solution = document.querySelector('#solution') as HTMLInputElement;
        const description = document.querySelector('#description') as HTMLInputElement;
        const street = document.querySelector('#street') as HTMLInputElement;
        const streetNumber = document.querySelector('#streetNumber') as HTMLInputElement;
        if (!inChargeSelesct || !statusSelest || !solution || !description || !street || !streetNumber) throw new Error('Missing elements');
        // if status is closed - must have solution
        if (statusSelest.value === 'closed' && !solution.value) {
            alert('must have solution');
            return;
        }

        
        const response = await fetch(`/API/inquiry/update-inquiry`, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: inquiry_id,
                status: statusSelest.value,
                solution: solution.value,
                description: description.value,
                street: street.value,
                streetNumber: streetNumber.value
            }),
        });
        const data = await response.json();
        if (!data.ok) throw new Error("inquiry not found");
        const response2 = await fetch(`/API/case/update-case`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                case_id,
                userId: inChargeSelesct.value,
                inquiry:data.existingInquiry
            }),
        });
        const data2 = await response2.json();
        if (!data2.ok) throw new Error("case not found");
        alert("case updated");
        renderAllCases();
    } catch (error) {
        console.error(error);
    }
}
async function showCaseDetails(case_) {
    try {
        const caseDetails = document.querySelector('#caseDetails');
        const updateCaseBtn = document.querySelector('#updateCaseBtn') as HTMLButtonElement;
        updateCaseBtn.onclick = async function () {
            await updateCase(case_.inquiry._id , case_._id);
        };
        const deleteCaseBtn = document.querySelector('#deleteCaseBtn') as HTMLButtonElement;
        deleteCaseBtn.onclick = async function () {
            await deleteCase();
        };
        const showcomplainanDetailsBtn = document.querySelector('#showcomplainanDetailsBtn')as HTMLButtonElement;

        const departmentName = await getDepartmentName(case_.departmentId);
        const titleName = await getTitleName(case_.inquiry.title);
        const complainant = await getComplainanDetails(case_.complainantId);
        const inchargesUserId = case_.userId
        const usersDepartment = await getUsersDepartment(case_.departmentId)

        if (!caseDetails || !updateCaseBtn || !deleteCaseBtn ||
            !case_ || !departmentName || !titleName || !inchargesUserId ||
            !usersDepartment || !showcomplainanDetailsBtn || !complainant)
            throw new Error('missing elements');

        caseDetails.setAttribute('data-case-id', case_._id);
        //  deleteUserBtn updateUserBtn display block
        updateCaseBtn.style.display = 'block';
        deleteCaseBtn.style.display = 'block';
        showcomplainanDetailsBtn.style.display = 'block';
        // add event listener to showcomplainanDetailsBtn btn
        showcomplainanDetailsBtn.addEventListener('click', () => {
            // pop up with complainan details from case.complainantId
            popUpComplainanDetails(complainant);
        });


        caseDetails.innerHTML = `
        <form id="caseDetailsForm"> 
        <div class="form-group case-group">
            <label>Case Number : ${case_.orderNumber}</label>
        </div>
        <div class="form-group case-group">
            <label>Created Date : ${formatDate(case_.inquiry.recivedDate)}</label> 
        </div>
        <div class="form-group case-group">
        <label>Deprtment Name : ${departmentName}</label>
        </div>
        <div class="form-group case-group">
        <label>Title Name : ${titleName}</label>
        </div>
        <div class="form-group case-group">
        <label for="inChargeSelesct">In charge Of </label>
        <select id="inChargeSelesct" class="form-control">
        </select>
        </div>
        <div class="form-group case-group">
        <label for="status">status </label>
        <select id="statusSelest" class="form-control">
        <option value="open">open</option>
        <option value="inProgress">in progress</option>
        <option value="closed">close</option>
        </select>
        </div>
        <div class="form-group case-group">
        <label for="solution">Enter Solution:</label>
        <input type="text" id="solution" value="${case_.inquiry.solution}" placeholder="solution">
        </div>
        <div class="form-group case-group">
            <label for="description">description:</label>
            <input type="text" id="description" value="${case_.inquiry.description}" placeholder="description">
        </div>
        <div class="form-group case-group">
            <label for="street">street:</label>
            <input type="text" id="street" value="${case_.inquiry.street}" placeholder="street">
        </div>
        <div class="form-group case-group">
            <label for="streetNumber">street Number:</label>
            <input type="text" id="streetNumber" value="${case_.inquiry.streetNumber}" placeholder="street Number">
        </div>
            </form> 
    `;
        // populate incharge select
        const inChargeSelesct = document.querySelector('#inChargeSelesct');
        const statusSelest = document.querySelector('#statusSelest');
        if (!inChargeSelesct || !statusSelest) throw new Error('Missing elements');
        usersDepartment.forEach((user) => {
            const option = document.createElement('option');
            option.value = user._id;
            option.textContent = `${user.firstName} ${user.lastName}`;
            inChargeSelesct.appendChild(option);
        });
        // set selected option
        inChargeSelesct.value = inchargesUserId;
        statusSelest.value = case_.inquiry.status;


    } catch (error) {
        console.error(error);
    }
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date string
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
async function getDepartmentCases(departmentId) {
    try {

        const response = await fetch(`/API/case/get-cases-by-department?departmentId=${departmentId}`);
        const data = await response.json();
        if (!data.ok) throw new Error("cases not found");
        return data.cases;
    } catch (error) {
        console.error(error);
    }


}


async function runAdminFunctions() {

    const user = await getLoggedInUser();

    if (!user) throw new Error("user not found");
    // dubble check if user is admin one here and one with middelware 
    if (user.role === "admin") {
        renderUpdateUserBtnPage();
        renderUpdateDepartmentBtnPage();
    }
}
async function runPersonalFunctions() {
    try {
        const user = await getLoggedInUser();
        if (!user) throw new Error("user not found");

    } catch (error) {
        console.error(error);
    }
}
runAdminFunctions();
runPersonalFunctions();
renderAllCases(); 