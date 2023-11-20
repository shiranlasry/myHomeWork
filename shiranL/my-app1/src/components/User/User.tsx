import React, { FC } from 'react';

export interface UserProps {
    id?: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    age: number;
    children?: React.ReactNode;
}

const User: FC<UserProps> =  ({name, username, email, phone, website, age,children }) => {
    return (
        <div className='userCard'>
            {children}
            <h1 className='userCard__name'>{name}</h1>
            <p className='userCard__username'>Username: {username}</p>
            <p className='userCard__email'>Email: {email}</p>
            <p className='userCard__phone'>Phone: {phone}</p>
            <p className='userCard__website'>Website: {website}</p>
            <p className='userCard__age'>Age: {age}</p>
        </div>
    );
}

export default User;
