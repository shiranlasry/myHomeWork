// SignUp.tsx
import React, { useState } from 'react';
import UserModel from '../../models/userModel';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    age: 0,
    interestSubject: [],
    email: '',
    password: '',
    isAdmin: false,
    isBlocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });



  const handleSignUp = async () => {
    try {
        debugger
      const newUser = new UserModel(formData);
      await newUser.save();
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Your JSX and form handling code goes here

  return (
   <form className='sign-up-form' onSubmit={handleSignUp}>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" id="fullName"  />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" />
        <label htmlFor="interestSubject">Interest Subject</label>
        <input type="text" name="interestSubject" id="interestSubject" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
