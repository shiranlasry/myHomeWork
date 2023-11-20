import express from 'express'
import { isAdmin } from '../user/middelware/users';
import { createCase, deleteCase, getCase, getCases, getCasesByDepartment, getCasesByUserId, updateCase } from './caseCont';
const router = express.Router();


router
    .post('/add-case', createCase)
    .get('/get-cases', getCases)
    .get('/get-case', getCase)
    .get('/get-cases-by-department', getCasesByDepartment)
    .get('/get-cases-by-userId', getCasesByUserId)
    .delete('/delete-case', isAdmin, deleteCase)
    .patch('/update-case', updateCase)


export default router;