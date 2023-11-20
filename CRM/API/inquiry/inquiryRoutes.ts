import express from 'express'
import { isAdmin } from '../user/middelware/users';
import { createInquiry, deleteInquiry, getInquiries, getInquiry, updateInquiry } from './inquiryCont';
const router = express.Router();


router
    .post('/add-inquiry', createInquiry)
    .get("/get-inquiries", getInquiries)
    .get("/get-inquiry", getInquiry)
    .delete("/delete-inquiry", isAdmin, deleteInquiry)
    .patch("/update-inquiry", updateInquiry)



export default router;