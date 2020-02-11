import React from 'react'
import './NavLink.css'

function NavLink(props) {
    return (
        <li>
            <a href="#">{props.text}</a>
        </li>        
    )
}

export default NavLink
