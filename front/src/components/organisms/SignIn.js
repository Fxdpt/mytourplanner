import React from 'react'
import './SignIn.css'

function SignIn(props) {
    return (
        <form>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" value="SE CONNECTER" />
            <span onClick={props.onClick}>X</span>
        </form>
    )
}

export default SignIn
