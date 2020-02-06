import { getRepository } from "typeorm"
import { User } from '../../entity/User'
import express = require('express')
const jwt = require('jsonwebtoken')

const hash = require('password-hash')
const router = express.Router()


router.post('/login', async (req:express.Request,res:express.Response) => {
    const email:string =  req.body.email
    const password:string = req.body.password
    const hiddenField:boolean = req.body.hiddenField
    const user:User = await getRepository(User).findOne({where:{email:email}})

    if(!email || !password){
        return res.send('Les informations saisies sont incorrectes')
    }

    if(!user || !hash.verify(password,user.password) || hiddenField !== undefined){
        return res.send('Les informations saisies sont incorrectes')
    }

    const token  = jwt.sign({
        username: email
    }, process.env.JWT_PASSPHRASE)

    res.send({
        token:token
    })
})

module.exports = router