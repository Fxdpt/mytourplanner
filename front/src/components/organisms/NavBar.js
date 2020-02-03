import React from 'react'
import Logo from '../atoms/Logo'
import NavBlock from '../molecules/NavBlock'
import './NavBar.css'

function NavBar() {
    return (
        <nav>
            <Logo />
            <NavBlock />
        </nav>
    )
}

export default NavBar
