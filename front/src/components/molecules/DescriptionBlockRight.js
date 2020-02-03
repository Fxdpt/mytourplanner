import React from 'react'
import HomePicture from '../atoms/HomePicture'
import HomeDescription from '../atoms/HomeDescription'
import './DescriptionBlockRight.css'

function DescriptionBlockRight() {
    return (
        <div className="DescriptionBlockRight">
            <HomePicture name="thumb-1"/>
            <HomeDescription align="right"/>
        </div>
    )
}



export default DescriptionBlockRight
