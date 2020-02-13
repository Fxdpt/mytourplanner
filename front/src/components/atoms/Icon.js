import React from 'react'

function Icon(props) {
    return (
        <a href={props.target} target="_blank" rel="noopener noreferrer">
            <i className={`fa ${props.name} ${props.size}`} aria-hidden="true"></i>
        </a>
    )
}

export default Icon
