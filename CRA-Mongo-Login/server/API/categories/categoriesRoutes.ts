// categoriesRoutes.ts
import express from "express";
import { addCategory } from "./categoriesCtrl";

const router = express.Router();

router.post("/addcategory", addCategory); // Fix the route path

export default router;
    