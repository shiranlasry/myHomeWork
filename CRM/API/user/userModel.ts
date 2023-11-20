import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }, // String is shorthand for {type: String}
  password: String,
  firstName: String,
  lastName: String,
  phoneNum: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  department: {
    type: Schema.Types.ObjectId, // Reference to the Department schema
    ref: 'DepartmentModel', // This should match the model name for the Department schema
    required: true
  }
});
//"users" is the name of the collection in the DB
export const UserModel = model("CRMuser", UserSchema)


