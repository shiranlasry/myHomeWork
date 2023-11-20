import { Schema, model } from "mongoose";

export const TitleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: Schema.Types.ObjectId, // Reference to the Department schema
        ref: 'DepartmentModel', // This should match the model name for the Department schema
        required: true
    }
});

export const TitleModel = model("title", TitleSchema);