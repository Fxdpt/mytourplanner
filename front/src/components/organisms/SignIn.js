import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import './SignIn.css'

function SignIn(props) {
    const [credentials,setCredentials] = useState({
        email:'',
        password:''
    })

    const handleChange = (e) => {
        const value = e.currentTarget.value
        const name = e.currentTarget.name

        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        try{
            axios.post('http://localhost:5000/login',credentials)
                .then( res => {
                    console.log(res)
                })
        }catch(err){
            console.log(err.response)
        }
        
    }

    return (
        <div className="form-container">
            <form>
                <TextField color="secondary" onChange={handleChange} value={credentials.username} className="formInput" aria-label="signin-email" label="email" type="email" name="email" />
                <TextField color="secondary" onChange={handleChange} value={credentials.password} className="formInput" aria-label="signin-password" label="mot de passe" type="password" name="password" />
                <Button id="signin-form-button" type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Envoyer
                </Button>
            </form>
            <span onClick={props.onClick}>Fermer</span>
        </div>

    )
}

export default SignIn
