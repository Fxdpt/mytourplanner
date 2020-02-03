import React from 'react'
import DescriptionBlockRight from '../molecules/DescriptionBlockRight'
import DescriptionBlockLeft from '../molecules/DescriptionBlockLeft'
import  './DescriptionBlockHandler.css'

function DescriptionBlockHandler() {
    return (
        <div className="DescriptionBlockHandler">
            <DescriptionBlockRight />
            <DescriptionBlockLeft />
        </div>
    )
    
}

export default DescriptionBlockHandler
