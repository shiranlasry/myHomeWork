import mongoose from "mongoose";
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    requierd: [true, "user must have email"]
  },
  username: {
    type: String,
    required: true
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  apartmentNumber:{
    type: Number,
    required: true
  },
  houseNumber:{
    type: Number,
    required: true
  },  
  isAdmin: {
    type: Boolean,
    default: false
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserValidation = Joi.object({  
street: Joi.string().required(),
houseNumber: Joi.number().required(),
apartmentNumber: Joi.number().required(),
city: Joi.string().required(),
email: Joi.string().email().required(),
username: Joi.string().alphanum().min(3).max(16).required(),
password: joiPassword
    .string()
    // .min(6)
    // .max(16)
    // .minOfSpecialCharacters(1)
    // .minOfLowercase(1)
    // .minOfUppercase(1)
    // .minOfNumeric(1)
    // .noWhiteSpaces()
    // .required(),
,password2: Joi.ref('password')});

