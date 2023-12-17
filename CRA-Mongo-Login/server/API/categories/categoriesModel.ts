import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        unique: true,
        required: [true, "category must have name"] // Fix the typo here
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});


const CategoryModel = mongoose.model("categories", CategorySchema);
export default CategoryModel;