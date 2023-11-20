
async function getCreatorUser() {
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
async function populateDepartmentsAndTitelsDropdown() {
    try {
        const departmentSelect = document.querySelector('#department-AddNewCase');
        if (!departmentSelect) throw new Error("Department dropdown not found");
        const CreatorUser = await getCreatorUser();
        if (!CreatorUser) throw new Error("User not logged in");
        // Make an API request to fetch department options
        const response = await fetch("API/department/get-departments-by-userId?departmentId=" + CreatorUser.department);
        const data = await response.json();
        if (data.ok) {
            // Clear existing options
            departmentSelect.innerHTML = '<option value="">Select a department</option>';
            //if departments is array render forech
            data.departments.forEach((department) => {
                const option = document.createElement('option');
                option.value = department._id; // You might want to use a unique identifier for each department
                option.textContent = department.name; // Display the department name
                departmentSelect.appendChild(option);
            });

            // add event on chenge department load titels
            departmentSelect.addEventListener('change', loadTitels);
            departmentSelect.addEventListener('change', populateInChargeOfDropdown);

        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
}
async function populateInChargeOfDropdown(event) {
    try {
        event.preventDefault()
        const usersSelect = document.querySelector('#inChargeOf-AddNewCase');
        if (!usersSelect) throw new Error("usersSelect dropdown not found");
        const department = event.target.value;
        if (!department) throw new Error("Department not selected");
        // Make an API request to fetch department options
        const response = await fetch(`API/user/get-users-by-department?department=${department}`);
        const data = await response.json();

        if (data.ok) {
            // Clear existing options
            usersSelect.innerHTML = '<option value="">Choose a therapist</option>';

            // Populate the dropdown with options from the API response
            data.users.forEach((user) => {
                const option = document.createElement('option');
                option.value = user._id; // You might want to use a unique identifier for each department
                option.textContent = user.firstName + ' ' + user.lastName; // Display the department name
                usersSelect.appendChild(option);
            });


        } else {
            throw new Error(data.message);
        }


    } catch (error) {
        console.error(error);
    }
}
async function loadTitels(event) {
    try {
        event.preventDefault()
        const titleSelect = document.querySelector('#title-AddNewCase');
        if (!titleSelect) throw new Error("Title dropdown not found");
        const department = event.target.value;
        if (!department) throw new Error("Department not selected");
        // Make an API request to fetch department options
        const response = await fetch(`API/title/get-titles?department=${department}`);
        const data = await response.json();

        if (data.ok) {
            // Clear existing options
            titleSelect.innerHTML = '<option value="">Select a title</option>';

            // Populate the dropdown with options from the API response
            data.titles.forEach((title) => {
                const option = document.createElement('option');
                option.value = title._id; // You might want to use a unique identifier for each department
                option.textContent = title.title; // Display the department name
                titleSelect.appendChild(option);
            });


        } else {
            throw new Error(data.message);
        }


    } catch (error) {
        console.error(error);
    }
}

function renderNewCaseComplainant() {
    try {
        const html= `<div class ="section">
         <h2>Complainant details</h2>    
        <div class="form-group">
        <label for="phoneNum">Phone Number:</label>
        <input type="tel" id="phoneNum" name="phoneNum" placeholder="Enter phone number" required>
    </div>
        <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" placeholder="Enter first name" required>
    </div>
    <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" placeholder="Enter last name" required>
    </div>
  
    <div class="form-group">
        <label for="street">Street:</label>
        <input type="text" id="street-complainant" name="street" placeholder="Enter street">
    </div>
    <div class="form-group">
        <label for="houseNum">House Number:</label>
        <input type="text" id="houseNum-complainant" name="houseNum" placeholder="Enter house number">
    </div>
    <div class="form-group">
        <label for="apartmentNum">Apartment Number:</label>
        <input type="text" id="apartmentNum-complainant" name="apartmentNum" placeholder="Enter apartment number">
    </div>
    </div>
        <input type="submit" value="Submit"> 
    </form> `

    return html;
    } catch (error) {
        console.error(error);
    }
}

function renderNewCaseService() {
    try {
        return `<form onsubmit="hundleAddNewCase(event)">
    <!-- department select -->
    <div class ="section">
    <h2>Case details</h2>
    <div class="form-group">
        <label for="department">Department:</label>
        <select id="department-AddNewCase" name="department" required>
            
        </select>
    </div>
    <!-- title select -->
    <div class="form-group">
        <label for="title">Title:</label>
        <select id="title-AddNewCase" name="title" required>
            <option value="">Select a title</option>
        </select>       
    </div>
    <div class="form-group">
    <label for="street-AddNewCase">Street:</label>
    <input type="text" id="street-AddNewCase" name="street-AddNewCase" placeholder="Enter street" list="street-suggestions">
    </div>
    <div class="form-group">
    <label for="streetNumber-AddNewCase">Number:</label>
    <input type="number" id="streetNumber-AddNewCase" name="streetNumber-AddNewCase" placeholder="Enter number">
    </div>
    <!-- in charge of input -->
    <div class="form-group">
        <label for="inChargeOf">in charge of:</label>
        <select id="inChargeOf-AddNewCase" name="inChargeOf" required>
            <option value="">Choose a therapist </option>
        </select>       
    </div>
    <!-- description input -->
    <div class="form-group">
             <label for="description-AddNewCase">description:</label>
            <input type="text" id="description-AddNewCase" name="description-AddNewCase" placeholder="Enter description" required>
    </div>
    <div class="form-group">
    <label for="status">status:</label> 
    <select id="status-AddNewCase" name="status" required>
        <option value="">Select a status</option>
        <option value="open">open</option>
        <option value="closed">closed</option>
        <option value="inProgress">inProgress</option>
    </select>
    </div>
    <div class="form-group">
        <label for="priority">priority:</label>
        <select id="priority-AddNewCase" name="priority" required>
            <option value="">Select a priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option> 
            <option value="high">high</option>
        </select> 
    </div>
    <div class="form-group">
    <label for="solution">solution:</label>
    <input type="text" id="solution" name="solution" placeholder="Enter solution">
    </div>
    </div>
`;
    } catch (error) {
        console.error(error);
    }

}

async function renderCaseForm() {
    try {
        const creatorUser = await getCreatorUser();
        if (!creatorUser) {
            alert("You are not logged in");
            window.location.href = "index.html";
            return;
        }
        const newCaseForm = document.getElementById("addNewCase");
        if (!newCaseForm) {
            throw new Error("Could not find new-case-form");
        }
        let newCaseFormHTML = renderNewCaseService();
        newCaseFormHTML += renderNewCaseComplainant();
        newCaseForm.innerHTML = newCaseFormHTML;
        populateDepartmentsAndTitelsDropdown();
        getComplainantFields();
        populateStreets();
    } catch (error) {
        console.error(error);
    }

}
async  function getComplainantFields() {
    try {
        
    const phoneNumInput = document.querySelector('#phoneNum');
    if (phoneNumInput) {
    phoneNumInput.addEventListener('input', async () => {
    const phoneNum = phoneNumInput.value;
    if (phoneNum) {
        const complainant = await checkComplainantExist(phoneNum);
        if (complainant) {
                // Populate the other fields with complainant details
                document.querySelector('#firstName').value = complainant.firstName;
                document.querySelector('#lastName').value = complainant.lastName;
                document.querySelector('#street-complainant').value = complainant.street;
                document.querySelector('#houseNum-complainant').value = complainant.houseNum;
                document.querySelector('#apartmentNum-complainant').value = complainant.apartmentNum;
            }
        }
    });
}

        
    } catch (error) {
        console.error(error);
    }
}
function populateStreets() {

    const nominatimEndpoint = "https://nominatim.openstreetmap.org/search";
    const streetInput = document.querySelector('#street-AddNewCase');
    if (!streetInput) return; // Ensure the input element exists

    // Initialize the event listener for input changes
    streetInput.addEventListener('input', () => {
        const searchTerm = streetInput.value;
        if (searchTerm.length < 3) return; // Ignore short input

        // Make a request to Nominatim API for address autocomplete
        fetch(`${nominatimEndpoint}?q=${searchTerm}&format=json`)
            .then(response => response.json())
            .then(data => {
                // Clear existing suggestions
                streetInput.setAttribute("list", "street-suggestions"); // Assign a datalist to the input
                const datalist = document.createElement('datalist');
                datalist.id = "street-suggestions";

                // Populate the datalist with suggestions
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.display_name;
                    datalist.appendChild(option);
                });

                // Replace the existing datalist (if any)
                const existingDatalist = document.querySelector('#street-suggestions');
                if (existingDatalist) {
                    existingDatalist.replaceWith(datalist);
                } else {
                    streetInput.insertAdjacentElement('afterend', datalist);
                }
            })
            .catch(error => console.error(error));
    });
}

async function checkComplainantExist(phoneNum) {
    try {
        const response = await fetch(`API/complainant/get-complainant-by-phoneNum?phoneNum=${phoneNum}`);
        const data = await response.json();
        debugger
        if (data.ok) { // return complainant from db
            return data.complainantDB;
        }
        else return false;
    } catch (error) {
        console.error(error);
    }
}

async function addNewComplainant(complainant) {
    try {
        console.log('addNewComplainant');
        const response = await fetch("API/complainant/add-New-complainant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(complainant)
        });
        const data = await response.json();
        if (data.ok) {
            return data.complainantDB;
        }
        else return false;
    } catch (error) {
        console.error(error);
    }
}



async function hundleAddNewCase(event) {
    try {
        event.preventDefault();
        // get data from form
        //get user id
        const creatorUser = await getCreatorUser();
        if (!creatorUser) {
            alert("You are not logged in");
            window.location.href = "index.html";
            return;
        }
        const userId = creatorUser._id;
        // get department id
        const departmentSelect = document.querySelector('#department-AddNewCase');
        if (!departmentSelect) throw new Error("Department dropdown not found");
        const department = departmentSelect.value;
        if (!department) throw new Error("Department not selected");
        // get title id
        const titleSelect = document.querySelector('#title-AddNewCase');
        if (!titleSelect) throw new Error("Title dropdown not found");
        const title = titleSelect.value;
        if (!title) throw new Error("Title not selected");
        // get in charge of id
        const inChargeOfSelect = document.querySelector('#inChargeOf-AddNewCase');
        if (!inChargeOfSelect) throw new Error("inChargeOf dropdown not found");
        const inChargeOf = inChargeOfSelect.value;
        if (!inChargeOf) throw new Error("inChargeOf not selected");
        // get street
        const streetCaseInput = document.querySelector('#street-AddNewCase');
        if (!streetCaseInput) throw new Error("street input not found");
        const streetCase = streetCaseInput.value;
        if (!streetCase) throw new Error("street not selected");
        // get apartment number
        const streetNumberCaseInput = document.querySelector('#streetNumber-AddNewCase');
        if (!streetNumberCaseInput) throw new Error("apartment number input not found");
        const streetNumberCase = streetNumberCaseInput.value;
        if (!streetNumberCase) throw new Error("apartment number not selected");

        // get description
        const descriptionInput = document.querySelector('#description-AddNewCase');
        if (!descriptionInput) throw new Error("description input not found");
        const description = descriptionInput.value;
        if (!description) throw new Error("description not selected");
        // get status
        const statusSelect = document.querySelector('#status-AddNewCase');
        if (!statusSelect) throw new Error("status dropdown not found");
        const status = statusSelect.value;
        if (!status) throw new Error("status not selected");
        // get priority
        const prioritySelect = document.querySelector('#priority-AddNewCase');
        if (!prioritySelect) throw new Error("priority dropdown not found");
        const priority = prioritySelect.value;
        if (!priority) throw new Error("priority not selected");
        // create inquiry object
        const solutionInput = document.querySelector('#solution');
        if (!solutionInput) throw new Error("solution input not found");
        const solution = solutionInput.value;
        if (status === "closed" && !solution) throw new Error("Can't close inquiry without solution");
        // get complainant details
        // get data from form    
        const firstNameInput = document.querySelector('#firstName');
        if (!firstNameInput) throw new Error("firstName input not found");
        const firstName = firstNameInput.value;
        const lastNameInput = document.querySelector('#lastName');
        if (!lastNameInput) throw new Error("lastName input not found");
        const lastName = lastNameInput.value;
        const phoneNumInput = document.querySelector('#phoneNum');
        if (!phoneNumInput) throw new Error("phoneNum input not found");
        const phoneNum = phoneNumInput.value;
        const streetInput = document.querySelector('#street-complainant');
        if (!streetInput) throw new Error("streetInput input not found");
        const streeComplainant = streetInput.value ? streetInput.value : '';
        const houseNumInput = document.querySelector('#houseNum-complainant');
        if (!houseNumInput) throw new Error("houseNumInput input not found");
        const houseNumComplainant = houseNumInput.value ? houseNumInput.value : '';
        const apartmentNumInput = document.querySelector('#apartmentNum-complainant');
        if (!apartmentNumInput) throw new Error("apartmentNumInput input not found");
        const apartmentNumComplainant = apartmentNumInput.value ? apartmentNumInput.value : '';
        
        let caseComplainant = await checkComplainantExist(phoneNum);
        const caseComplainantFileds = {
            firstName,
            lastName,
            phoneNum,
            streeComplainant,
            houseNumComplainant,
            apartmentNumComplainant
        }
        if (!caseComplainant) {
            caseComplainant = await addNewComplainant(caseComplainantFileds);
            if (!caseComplainant) throw new Error("Failed to add complainant"); 
        }
        else{
            // update all fields except phone number
            const updatedFields = {
                firstName,
                lastName,
                street:streeComplainant,
                houseNum:houseNumComplainant,
                apartmentNum:apartmentNumComplainant
            }
            const ComplainantUpdated =  await updateComplainant(caseComplainant._id, updatedFields); 
            if (!ComplainantUpdated) throw new Error("Failed to update complainant");
        }
       
     
        const inquiry = {
            userCreatorId: userId,
            department,
            title,
            streetCase,
            streetNumberCase,
            description,
            recivedDate: new Date(),
            closedDate: null,
            status,
            priority,
            solution
        };
        
        // send inquiry to server
        const response = await fetch("API/inquiry/add-inquiry", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inquiry)
        });

        const data = await response.json();

        
        if (data.ok) {

        const isCaseAdded = await addNewCase(data.inquiryDB, inChargeOf, department, caseComplainant._id);


        if (!isCaseAdded) throw new Error("Failed to add case");

            alert("Inquiry added successfully");
            window.location.href = "CRM_homePage.html";
        } else {
            throw new Error(data.message);
        }


    } catch (error) {
        console.error(error);
    }
}

async function updateComplainant(complainantId, updatedFields) {
    try {
      const response = await fetch('/api/complainant/update-complainant', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complainantId,
          ...updatedFields, // Include the updated fields in the request body
        }),
      });
  
      const data = await response.json(); 
  debugger
      if (data) {
       return data.updatedComplainant
        // You can perform any additional actions after a successful update here
      } else {
        console.error('Failed to update complainant:', data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
async function addNewCase(inquiry, userId, departmentId, complainantId) {
    try {

        const response = await fetch("API/case/add-case", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inquiry, departmentId, userId, complainantId })
        });
        const data = await response.json();

        if (data.ok) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
renderCaseForm();