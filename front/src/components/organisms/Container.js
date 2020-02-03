import React from 'react'
import NavBar from './NavBar'
import DescriptionBlockHandler from '../molecules/DescriptionBlockHandler'
import './Container.css'

function Container() {
    return (
        <div className="container">
            <NavBar />
            <DescriptionBlockHandler />
        </div>
        
    )
}

export default Container
