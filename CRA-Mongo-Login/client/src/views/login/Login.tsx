
import { useState } from "react";

import { NavLink } from "react-router-dom";
import './login.scss'
import { logIn } from "../../api/usersApi";
import { useAuth } from "../../context/userContext";

const Login = () => {
  const { login } = useAuth();


const handelLogin = async (e: any) => {
  e.preventDefault();
  try {
    const email = e.target.email.value;
    const password = e.target.password.value;
    debugger
    const data = await logIn(email,password);
    console.log(data);
    if (data) {
      const loggedInUser = { email: data.email }; // Replace with actual user data
      login(loggedInUser);
      alert('Login success');
      

    }
  } catch (err) {
    console.log(err);
  }
}
  return (
    <div className="main-login">

      <h1>Login</h1>
      <form className='login-form'  onSubmit={handelLogin}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <input type='submit' value='Login' />
      </form>
   
    </div>
  );
};

export default Login;
