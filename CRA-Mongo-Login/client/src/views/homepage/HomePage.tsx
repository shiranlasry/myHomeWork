import React, { useState } from 'react'
import { useUser } from '../../context/userContext';
import { addCategory } from '../../api/categoriesApi';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  
  const { user } = useUser();
  const navigate = useNavigate(); 

  const handelAddCategoty = async () => {
    navigate('/categories') ;

  }
  
  return (
    <div className='main-homepage'>
      <p>home page</p>
      <h1>hello {user?.username}</h1>
      
      <button onClick={handelAddCategoty}>Add Category</button>
    </div>
  )
}

export default HomePage
