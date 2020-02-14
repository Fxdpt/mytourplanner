import { getRepository } from "typeorm"
import { User } from '../../entity/User'
import express = require('express')
import { JsonHandler } from '../../services/JsonHandler'
const jwt = require('jsonwebtoken')
const hash = require('password-hash')
const router = express.Router()

router.post('/login', async (req: express.Request, res: express.Response) => {
    const data: any = JsonHandler.clearInput(req.body)
    const email: string = data.email
    const password: string = data.password
    const hiddenField: boolean = data.hiddenField
    const user: User = await getRepository(User).findOne({ where: { email: email } })

    if (!email || !password) {
        res.status(400)
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Les informations saisies sont incorrectes',res.statusCode)
        return res.send(response)
    }
    if (!user || !hash.verify(password, user.password) || typeof hiddenField !== 'undefined') {
        res.status(400)
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Les informations saisies sont incorrectes',res.statusCode)
        return res.send(response)
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_PASSPHRASE)

    res.send({
        token: token
    })
})

module.exports = router