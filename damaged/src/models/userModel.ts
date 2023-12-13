// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
    FullName: string;
    age: number;
    interestSubject: string[];
    email: string;
    password: string;
    isAdmin: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  
const userSchema = new Schema<User>({
    FullName: String,
    age: Number,
    interestSubject: [String],
    email: String,
    password: String,
    isAdmin: Boolean,
    isBlocked: Boolean,
    createdAt: Date,
    updatedAt: Date,
  });
  
  const UserModel = mongoose.model<User>('User', userSchema);
  
  export default UserModel;