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

    newUser.email = req.body.email
    newUser.password = hash.generate(req.body.password)
    newUser.username = req.body.username

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