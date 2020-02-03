import React from 'react'
import Link from '../atoms/Link'
import './Footer.css'

function Footer() {
    return (
        <footer>
            <ul>
                <li><Link text="PLAN DU SITE" target="plan" /></li>
                <li><Link text="MENTIONS LEGALES" target="mentions" /></li>
                <li><Link text="CONTACT" target="contact" /></li>
            </ul>
            
            
            
        </footer>
    )
}

export default Footer
