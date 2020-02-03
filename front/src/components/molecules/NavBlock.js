import React, { useState, useEffect } from 'react'
import Link from '../atoms/Link'
import './NavBlock.css'

function NavBlock() {
    const [linkInfos, setLinkInfos] = useState([
        {
            text: 'S\'INSCRIRE',
            target: 'app_signup'
        },
        {
            text: 'SE CONNECTER',
            target: 'app_signin'
        }
    ])

    useEffect(() => {
        handleLinksOutput()
    })

    const isLogged = false

    const handleLinksOutput = () => {
        if (isLogged) {
            setLinkInfos([
                {
                    text: 'SE DECONNECTER',
                    target: 'app_logout'
                },
                {
                    text: 'MON PROFIL',
                    target: 'profil'
                }
            ])
        }
    }

    return (
        <ul className="navBlock">
            <Link text={linkInfos[0].text} target={linkInfos[0].target} ></Link>
            <Link text={linkInfos[1].text} target={linkInfos[1].target} ></Link>
        </ul>
    )
}

export default NavBlock
