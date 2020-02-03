import React from 'react'
import HomePicture from '../atoms/HomePicture'
import HomeDescription from '../atoms/HomeDescription'
import './DescriptionBlockLeft.css'

function DescriptionBlockLeft() {
    return (
        <div className="DescriptionBlockLeft">
            <HomeDescription align="left"/>
            <HomePicture name="thumb-2"/>            
        </div>
    )
}



export default DescriptionBlockLeft
