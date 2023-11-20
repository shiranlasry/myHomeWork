import { Schema, model } from 'mongoose';
import { InquirySchema } from '../inquiry/inquiryModel';
import { DepartmentSchema } from '../department/departmentModel';
import { UserSchema } from '../user/userModel';

export const CaseSchema = new Schema({
    orderNumber: {
        type: Number,
        unique: true,
        required: true,
        default: 1000 // Starting order number
    },
    inquiry: InquirySchema,
    departmentId: {
        type: Schema.Types.ObjectId, // Reference to the Department schema
        ref: 'DepartmentModel', // This should match the model name for the Department schema
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, // Reference to the Department schema
        ref: 'UserModel', // This should match the model name for the Department schema
        required: true
    },
    complainantId: {
        type: Schema.Types.ObjectId, // Reference to the Department schema
        ref: 'ComplainantModel', // This should match the model name for the Department schema
        required: true
    }


});

//"cases" is the name of the collection in the DB
export const CaseModel = model("case", CaseSchema)


