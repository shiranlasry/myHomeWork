
// Login.tsx

import { ChangeEvent, useContext, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import './login.scss'
import { logIn } from "../../api/usersApi";
import {  useUser } from "../../context/userContext";

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const { setUser } = useUser();
const navigate = useNavigate();

const handelLogin = async (e: any) => {
  e.preventDefault();
  try {
  
    const data = await logIn(email,password);
    console.log(data);
    if (data) {
     // need to setuser with 
     
      setUser(data.userDB);
      
       
      alert('Login success');
      navigate("/homepage");
    }
  } catch (err) {
    console.log(err);
  }
}

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  if (name === 'email') {
    setEmail(value);
  } else if (name === 'password') {
    setPassword(value);
  }
};
  return (
    <div className="main-login">

      <h1>Login</h1>
      <form className='login-form'  onSubmit={handelLogin}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' 
         onInput={handleInputChange} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password'
        onInput={handleInputChange} />
        <input type='submit' value='Login' />
      </form>
   
    </div>
  );
};

export default Login;
