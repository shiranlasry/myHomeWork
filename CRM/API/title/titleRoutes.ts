import express from 'express';
import { isAdmin } from '../user/middelware/users';
import { createTitle, deleteTitle, getTitle, getTitles, updateTitle,getTitleName } from './titleCont';

const router = express.Router();

router
    .post('/add-title', createTitle)
    .get("/get-titles", getTitles)
    .get("/get-title", getTitle)
    .get("/get-title-name", getTitleName)
    .delete("/delete-title", deleteTitle)
    .patch("/update-title", updateTitle)

export default router;