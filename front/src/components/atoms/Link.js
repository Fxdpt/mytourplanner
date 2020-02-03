import React from 'react'
import './Link.css'

function Link(props) {
    return (
        <li>
            <a href={props.target}>{props.text}</a>
        </li>        
    )
}

export default Link
