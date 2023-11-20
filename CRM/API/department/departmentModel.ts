import { Schema, model } from 'mongoose';

export const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true
    },
    departmentManager: String,
    managerPhoneNum: String

});
//"departments" is the name of the collection in the DB
export const DepartmentModel = model("department", DepartmentSchema)


