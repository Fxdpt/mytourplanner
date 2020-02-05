import { getRepository } from "typeorm"
import { User } from '../../entity/User'
import express = require('express')
const jwt = require('jsonwebtoken')

const hash = require('password-hash')
const router = express.Router()


router.post('/login', async (req:express.Request,res:express.Response) => {
    const email:string =  req.body.email
    const password:string = hash.generate(req.body.password)
    const hiddenField:boolean = req.body.hiddenField
    const user:User = await getRepository(User).findOne({where:{email:email}})

    if(!user || hiddenField || password !== user.password){
        return res.send('Les informations saisies sont incorrectes')
    }

    const token  = jwt.sign({
        username: email
    }, process.env.JWT_PASSPHRASE)

    res.send({
        token:token,
    })
})