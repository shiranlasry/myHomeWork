import { DepartmentModel } from "./departmentModel";

export async function createDepartment(req: any, res: any) {
  try {
    const { name, phoneNum, departmentManager, managerPhoneNum } = req.body;
    if (!name || !phoneNum || !departmentManager || !managerPhoneNum) throw new Error("missing required fields");
    const department = new DepartmentModel({ name, phoneNum, departmentManager, managerPhoneNum });
    const departmentDB = await department.save();
    res.send({ ok: true, departmentDB });
  } catch (error) {
    console.error(error);
  }
}

export async function getDepartments(req: any, res: any) {
  try {
   
    const departments = await DepartmentModel.find();
    res.send({ ok: true, departments });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}
export async function getDepartmentsByUserId(req: any, res: any) {
  try {
    const {departmentId}=req.query; 
    if (!departmentId) throw new Error("missing required fields");  
    const department = await DepartmentModel.findById({_id:departmentId});
    if (!department) throw new Error("department not found");
    if (department.name == 'Moked'){
    const departments = await DepartmentModel.find();
    res.send({ ok: true, departments });
  }else
   res.send({ ok: true, departments :[department]});  
  
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getDepartment(req: any, res: any) {
  try {
    const { _id } = req.query;
    const department = await DepartmentModel.findById(_id);
    if (!department) throw new Error("department not found");
    res.send({ ok: true, department });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}
export async function getDepartmentName(req: any, res: any) {
  try {
    const { _id } = req.query;
    const department = await DepartmentModel.findById(_id);
    if (!department) throw new Error("department not found");
    res.send({ ok: true, departmentName:department.name });
  } catch (error) { 
    console.error(error);
    res.send({ error: error.message });  
  }
}

export async function deleteDepartment(req: any, res: any) {
  try {
    const { _id } = req.query;
    const department = await DepartmentModel.findByIdAndDelete(_id);
    if (!department) throw new Error("department not found");
    res.send({ ok: true, department });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function updateDepartment(req: any, res: any) {
  try {
    const { name, phoneNum, departmentManager, managerPhoneNum, _id } = req.body;
    const existingDepartment = await DepartmentModel.findById(_id);
  
    if (!existingDepartment) throw new Error("department not found");
    if (name !== existingDepartment.name) existingDepartment.name = name;
    if (phoneNum !== existingDepartment.phoneNum) existingDepartment.phoneNum = phoneNum;
    if (departmentManager !== existingDepartment.departmentManager) existingDepartment.departmentManager = departmentManager;
    if (managerPhoneNum !== existingDepartment.managerPhoneNum) existingDepartment.managerPhoneNum = managerPhoneNum;
    await existingDepartment.save();
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
  }
}
