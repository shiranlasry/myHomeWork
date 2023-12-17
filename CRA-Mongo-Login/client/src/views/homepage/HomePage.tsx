import React from 'react'
import { useUser } from '../../context/userContext';

const HomePage = () => {
  const { user } = useUser();
  
  return (
    <div className='main-homepage'>
      <p>home page</p>
      <h1>hello {user?.username}</h1>
    </div>
  )
}

export default HomePage
