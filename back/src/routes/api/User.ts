import express = require('express')
import { getRepository } from "typeorm"
import { User } from '../../entity/User'
import { JsonHandler } from '../../services/JsonHandler'
const router = express.Router()
const hash = require('password-hash')

router.get('/', async (req: express.Request, res: express.Response) => {
    const users: User[] = await getRepository(User).find()

    res.send(users)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const user: User = await getRepository(User).findOne(id)

    res.send(user)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const newUser: User = new User()
    const data: any = JsonHandler.clearInput(req.body)
    const email: string = data.email
    const password: string = data.password
    const confirm_password: string = data.confirm_password
    const username: string = data.username
    const hiddenField: boolean = data.hiddenField
    const user = await getRepository(User).findOne({ where: { email: email } })

    if (user) {
        res.status(403)
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Cet adresse mail possède déjà un compte',res.statusCode)
        return res.send(response)
    }
    //Check if a field is not set or if the hiddenField is set (if the hidden field is set there is propability that the form was submit by a bot)
    if (
        typeof hiddenField !== 'undefined'
        || !password
        || !email
        || !confirm_password
        || !username
        || password !== confirm_password
    ) {
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Les informations saisies sont incorrectes')
        return res.send(response)
    }
    if (password.length < 8) {
        res.status(400)
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Votre mot de passe doit faire au moins 8 caractères',res.statusCode)
        return res.send(response)
    }

    newUser.email = email
    newUser.password = hash.generate(password)
    newUser.username = username
    await getRepository(User).save(newUser)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Inscription validée')
    res.send(response)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const user: User = await getRepository(User).findOne(id)

    await getRepository(User).remove(user)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Utilisateur supprimé')
    res.send(response)
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const user: User = await getRepository(User).findOne(id)
    const data: any = JsonHandler.clearInput(req.body)

    if (user !== req.user) {
        res.status(403)
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Vous ne pouvez modifier que les informations de votre compte',res.statusCode)
        return res.send(response)
    }

    user.email = data.email
    user.username = data.username
    await getRepository(User).save(user)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Informations mise à jour')
    res.send(response)
})

module.exports = router;