import { Schema, model } from 'mongoose';

export const InquirySchema = new Schema({
  userCreatorId: {
    type: Schema.Types.ObjectId, // Reference to the Department schema
    ref: 'UserModel', // This should match the model name for the Department schema
    required: true
  },
  department: {
    type: Schema.Types.ObjectId, // Reference to the Department schema
    ref: 'DepartmentModel', // This should match the model name for the Department schema
    required: true
  },
  title: {
    type: Schema.Types.ObjectId, // Reference to the Department schema
    ref: 'TitleSchema', // This should match the model name for the Department schema
    required: true
  },

  street:{
    type:String,
    default: ""
  },
  streetNumber:{
    type:Number,
    default: ""
  },
  description: String,
  recivedDate: Date,
  status: {
    type: String,
    enum: ["open", "closed", "inProgress"],
    default: "open"
  },
  closedDate: { 
    type: Date,
    default: null
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },
  solution: {
    type: String,
    default: null
  }

});

//"inquiries" is the name of the collection in the DB
export const InquiryModel = model("inquiry", InquirySchema)


