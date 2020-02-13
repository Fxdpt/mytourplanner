import React from 'react'
import NavLink from '../atoms/NavLink'
import Icon from '../atoms/Icon'
import './Footer.css'

function Footer() {
    return (
        <footer>
            <div className="container">
                <ul className="footer-nav">
                    <NavLink text="PLAN DU SITE" target="plan" />
                    <NavLink text="MENTIONS LEGALES" target="mentions" />
                    <NavLink text="CONTACT" target="contact" />
                </ul>
                <ul className="social">
                    <li><Icon name="fa-twitter" size="fa-2x" target="http://twitter.com/Fxdpt1" /></li>
                    <li><Icon name="fa-facebook" size="fa-2x" target="https://www.facebook.com/jeremy.quenellier" /></li>
                    <li><Icon name="fa-github" size="fa-2x" target="https://github.com/Fxdpt/mytourplanner" /></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
