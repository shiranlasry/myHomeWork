// categoriesCtrl.ts
import express from "express";
import CategoryModel from "./categoriesModel";

export async function addCategory(req: express.Request, res: express.Response) {
    try {
        const CategoryName = req.body.CategoryName;
        const categoryDB = new CategoryModel({ CategoryName });
        await categoryDB.save();
        res.status(201).json({ addCategory: true, categoryDB });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ addCategory: false, error: err.message });
    }
}
