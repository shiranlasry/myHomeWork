// User.js

import React, { FC, useEffect, useState } from 'react';
import './User.scss';

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  counter: number;
  emoji?: string; // Optional emoji prop
  addOneToCounter: () => void;
  removeOneFromCounter: () => void;
  onClick: () => void; // Add this line
}

const User: FC<UserProps> = ({firstName, lastName, counter,emoji, onClick ,addOneToCounter, removeOneFromCounter,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#f5f5f5'); // Default background color

  useEffect(() => {
    // Change background color when the counter reaches 5
    if (counter % 5 === 0) {
      setBackgroundColor(getRandomColor());
    }
  }, [counter]);
  const getRandomColor = (): string => {
    // Generate a random color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div className='userCard' style={{ backgroundColor }} onClick={onClick}>
      <h1 className='userCard__name'>First Name: {firstName}</h1>
      <p className='userCard__lastName'>Last Name: {lastName}</p>
      {counter % 10 === 0 && emoji && <span className='userCard__emoji'>{emoji}</span>}
      <p className='userCard__counter'>
        Counter: {counter}
        <button className='userCard__btn' onClick={addOneToCounter}>+</button>
        <button className='userCard__btn' onClick={removeOneFromCounter}>-</button>
      </p>
    </div>
  );
};

export default User;
