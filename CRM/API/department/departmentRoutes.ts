import express from 'express'
import { isAdmin } from '../user/middelware/users';
import { createDepartment, getDepartmentName,deleteDepartment, getDepartment, getDepartments,getDepartmentsByUserId, updateDepartment } from './departmentCont';
const router = express.Router();


router
    .post('/add-department', createDepartment)
    .get("/get-departments", getDepartments)
    .get("/get-departments-by-userId", getDepartmentsByUserId)
    .get("/get-department", getDepartment)
    .get("/get-department-name", getDepartmentName)
    .delete("/delete-department", isAdmin,deleteDepartment)
    .patch("/update-department",isAdmin, updateDepartment) 
    



export default router;