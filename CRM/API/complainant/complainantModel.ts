import { Schema, model } from "mongoose";

export const ComplainantSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true,
    },
    street: {
        type: String,
        required: false,
        unique: false,
    },
    houseNum: {
        type: String,
        required: false,
        unique: false,
    },
    apartmentNum: {
        type: String,
        required: false,
        unique: false,
    }
});

//"complainants" is the name of the collection in the DB
export const ComplainantModel = model("complainants", ComplainantSchema);