import React from 'react'
import { TextField, Button } from '@material-ui/core'
import './SignIn.css'

function SignIn(props) {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('toto')
    }

    return (
        <div className="form-container">
            <form>
                <TextField color="secondary" className="formInput" aria-label="signin-email" label="email" type="email" name="username" />
                <TextField color="secondary" className="formInput" aria-label="signin-password" label="mot de passe" type="password" name="password" />
                <Button id="signin-form-button" type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Envoyer
                </Button>
            </form>
            <span onClick={props.onClick}>Fermer</span>
        </div>

    )
}

export default SignIn
