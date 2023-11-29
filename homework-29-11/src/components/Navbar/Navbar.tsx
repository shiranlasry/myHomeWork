import React, { FC } from 'react'
import './Navbar.scss'

interface NavbarProps {

    navName: string;
}

const Navbar: FC<NavbarProps> = ({ navName }) => {
    return (
        <div className='navbar'>
            <h1>{navName}</h1>
        </div>
    )
}

export default Navbar
