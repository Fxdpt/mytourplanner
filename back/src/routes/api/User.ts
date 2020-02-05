import { getRepository } from "typeorm"
import { User } from '../../entity/User'
import express = require('express')
const router = express.Router()
const hash = require('password-hash')

router.get('/', async (req:express.Request, res:express.Response) => {
    const users:User[] = await getRepository(User).find()
    
    res.send(users)
})

router.get('/:id', async (req:express.Request, res:express.Response) =>{
    const id:number = req.params.id
    const user:User = await getRepository(User).findOne(id)
    
    res.send(user)
})

router.post('/', async (req:express.Request, res:express.Response) => {

    const newUser:User = new User()
    const email:string = req.body.email
    const password:string = req.body.password
    const confirm_password:string = req.body.confirm_password
    const username:string = req.body.username
    const hiddenField = req.body.hidden

    //Check if a field is not set or if the hiddenField is set (if the hidden field is set there is propability that the form was submit by a bot)
    if(
        hiddenField 
        || !password 
        || !email 
        || !confirm_password 
        || !username 
        || password !== confirm_password
        ){
        return res.send('Les informations saisies sont incorrectes')
    }

    if(password.length < 8){
        return res.send('Votre mot de passe doit faire au moins 8 caractères')
    }

    newUser.email = email
    newUser.password = hash.generate(password)
    newUser.username = username

    await getRepository(User).save(newUser)

    res.send(newUser)

})

router.delete('/:id', async (req:express.Request, res:express.Response) =>{
    const id:number = req.params.id
    const user:User = await getRepository(User).findOne(id)
    
    await getRepository(User).remove(user)
    
    res.send(user)
})

router.put('/:id', async (req:express.Request, res:express.Response) =>{
    const id:number = req.params.id
    const user:User = await getRepository(User).findOne(id)
    
    user.email = req.body.email
    user.username = req.body.username

    await getRepository(User).save(user)
    
    res.send(user)
})

module.exports = router;