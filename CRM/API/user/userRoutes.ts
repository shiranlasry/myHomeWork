//user routes

import express from 'express'
import { registerUser, updatePersonalInfo, login, LogOutCockie, getUsers, deleteUser, updateUser, getLoggedUserDB, updatePassword, getUsersByDepartment, getUserById } from './userCont';
import { getLoggedUser, isAdmin } from './middelware/users';
const router = express.Router();


router
    .post('/log-in', login)
    .post('/register', isAdmin, registerUser)
    .get('/get-logged-user', getLoggedUserDB)
    .get('/get-users-by-department', getUsersByDepartment)
    .get('/get-users', isAdmin, getUsers)
    .get('/get-user-by-id', getUserById)
    .delete('/delete-user', isAdmin, deleteUser)
    .patch('/update-user', isAdmin, updateUser)
    .patch('/update-password', isAdmin, updatePassword)
    .post('/log-out', LogOutCockie)
    .patch('/update-personal-info', updatePersonalInfo)

export default router;