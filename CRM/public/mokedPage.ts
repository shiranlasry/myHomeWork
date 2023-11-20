const root = document.querySelector('#root') as HTMLElement;

function renderAddNewCase() {
  try {

    const formHTML = `<div class="form-container">
        <h2 class="form-heading">Add New Case</h2>
        <form onsubmit="hundleSubmitCase(event)">
          <div class="form-group">
            <label for="title" class="label"> title</label>
            <input type="text" class="form-control" id="title" placeholder="Enter your title" required>
          </div>
          <div class="form-group">
          <select class="form-control" id="department" onchange="loadDepartmentInfo()">
            <option value="" disabled selected>Select Department</option>
                   </div><br>
          <div class="form-group">
            <label for="description" class="label">Case description</label>
             <textarea name="date" id="description" class="form-control" placeholder="Enter your description" cols="65" rows="10"></textarea>
          </div>
          <div class="form-group">
            <label for="recivedDate" class="label">recived Date</label>
            <input type='date' name="recivedDate" id='recivedDate' />
           </div>
           <div class="form-group">
            <label for="closedDate" class="label">closed Date</label>
            <input type='date' name="closedDate" id='closedDate' />
           </div>
          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>`;
    root.innerHTML = formHTML;
  } catch (error) {
    console.error(error);
  }

}


async function hundleSubmitCase(ev) {
  try {
    ev.preventDefault();
    const title = ev.target.title.value;
    const description = ev.target.description.value;
    const recivedDate = ev.target.recivedDate.value;
    const closedDate = ev.target.closedDate.value;

    console.log(recivedDate)


    if (!title || !description) throw new Error("fields are missing");
    const cases = {
      title: title,
      description: description,
      recivedDate: recivedDate,
      closedDate: closedDate
    }
    console.log(cases)

    const response = await fetch("/API/inquiry/add-inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cases)
    });
    if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}



function renderViewCases() {
  try {

    let formHTML = `<div class="form-container">
        <h2 class="form-heading">View Cases</h2>
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Department</th>
            <th scope="col">Recived Date</th>
            <th scope="col">Closed Date</th>
           
          </tr>
        </thead>
        <tbody>`;
    fetch("/API/inquiry/get-inquiries")
      .then((response) => {
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const inquiries = data.inquiries;
        inquiries.forEach((inquiry) => {
          formHTML += `<tr>
                    <td>${inquiry.title}</td>
                    <td>${inquiry.description}</td>
                    <td>${inquiry.department}</td>
                    <td>${inquiry.recivedDate}</td>
                    <td>${inquiry.closedDate}</td>
                   
                   
                  </tr>`;
        });
        formHTML += `</tbody>
                </table>
                </div>`;
        root.innerHTML = formHTML;
      });
  } catch (error) {
    console.error(error);
  }
}

async function loadDepartmentInfo() {
  try {
    console.log(8888)
    const departmentId = document.querySelector<HTMLInputElement>("#department").value;
    console.log(departmentId);
    const response = await fetch(`/API/department/get-department?_id=${departmentId}`);
    console.log(response, 222);
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