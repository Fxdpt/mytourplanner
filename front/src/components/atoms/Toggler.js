import React, {useState} from 'react'
import './Toggler.css'

function Toggler({toggle, content}) {
    const [isShown,setIsShown] = useState(false)
    const hide = () => setIsShown(false)
    const show = () => setIsShown(true)

    return (
        <React.Fragment>
            {toggle(show)}
            {isShown && content(hide)}
        </React.Fragment>
    )
}

export default Toggler
