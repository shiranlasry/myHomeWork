
import { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import './login.scss'
import { logIn } from "../../api/usersApi";

const Login = () => {
const [user, setUser] = useState({email: '', password: ''});
const handelLogin = async (e: any) => {
  e.preventDefault();
  try {
    const email = e.target.email.value;
    const password = e.target.password.value;
    debugger
    const data = await logIn(email,password);
    console.log(data);
    if (data) {
      setUser({email,password})
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
