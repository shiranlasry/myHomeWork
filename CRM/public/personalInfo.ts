

async function getPersonalInfo() {
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

async function renderPersonalInfoForm() {
    try {
        
        const userPersonalInfo = await getPersonalInfo();   
        if (!userPersonalInfo) { throw new Error("User is not logged in");}
        const userDeailesDiv= document.querySelector("#user-details-div");
        if (!userDeailesDiv) { throw new Error("No div with id user-details-div");}

        const deparmentName= await getDepartmentName(userPersonalInfo.department);

        const form = document.createElement("form");
        form.id = "personal-info-form";
        form.innerHTML = `
        <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" value="${userPersonalInfo.firstName}" placeholder="First Name">
        </div>
        <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" value="${userPersonalInfo.lastName}" placeholder="Last Name">  
        </div>
        <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" value="${userPersonalInfo.phoneNum}" placeholder="Phone">
        </div>
        <div class="form-group">
        <label> Email: ${userPersonalInfo.email}</label>
        </div>
    <div>
    <label for="role">Role:</label>
    <label>${userPersonalInfo.role}</label>
    </div>
    <div>
    <label for="department">Department:</label>
    <label>${deparmentName} </label>
    </div>
    <div>
    <input type="submit" value="Save">
    </div> `
    
    userDeailesDiv.appendChild(form);
    userDeailesDiv.addEventListener("submit", updatePersonalInfo);

    } catch (error) {
        console.error(error);
    }
    
}
async function updatePersonalInfo(event){
    event.preventDefault();
    try {
        
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const phoneNum = event.target.phone.value; 
      
        const user = await getPersonalInfo();
        if (!user) { throw new Error("User is not logged in");}
        const response = await fetch("/API/user/update-personal-info", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({firstName, lastName, phoneNum, _id: user._id}),
        });
            
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        const data = await response.json();
        if (data.ok) {
            alert("Personal info updated successfully");
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        console.error(error);
    }
}
async function getDepartmentName(_id){
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
renderPersonalInfoForm();