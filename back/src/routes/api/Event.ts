import { getRepository } from 'typeorm'
import express = require('express')
import { Place } from '../../entity/Place'
import { Event } from '../../entity/Event'
import { Band } from '../../entity/Band'
import { Message } from '../../entity/Message'
import { JsonHandler } from '../../services/JsonHandler'
import { User } from '../../entity/User'
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const events: Event[] = await getRepository(Event).find({ relations: ["place", "users", "bands"] })

    res.send(events)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const eventId: number = req.params.id
    const event: Event = await getRepository(Event).findOne({
        where: {
            id: eventId
        },
        relations: ["place", "users", "bands"]
    })

    res.send(event)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const event: Event = new Event()
    const data: any = JsonHandler.clearInput(req.body)
    const bands: Band[] = await getRepository(Band).findByIds(data.bands)
    const place: Place = await getRepository(Place).findOne(data.place)

    if (!data.date) {
        const response: JsonHandler = JsonHandler.JsonResponse(false, 'Une date doit obligatoirement être spécifiée')
        return res.send(response)
    }

    event.date = data.date
    event.bands = bands
    event.place = place

    await getRepository(Event).save(event)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Evènement créé')
    res.send(response)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const eventId: number = req.params.id
    const event: Event = await getRepository(Event).findOne(eventId)

    await getRepository(Event).remove(event)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Evènement supprimé')
    res.send(response)
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const event: Event = await getRepository(Event).findOne({
        where: {
            id: id
        },
        relations: ["users", "bands", "place"]
    })
    const data: any = JsonHandler.clearInput(req.body)
    const bands: Band[] = await getRepository(Band).findByIds(data.bands)
    const place: Place = await getRepository(Place).findOne(data.place)

    event.date = data.date
    event.bands = bands
    event.place = place

    await getRepository(Event).save(event)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Evènement édité')
    res.send(response)
})

router.get('/:id/messages', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const event: Event = await getRepository(Event).findOne(id)
    const messages: Message[] = await getRepository(Message).find({ where: { event: event } })

    res.send(messages)
})

router.post('/:id/messages', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const userId: number = req.user.id
    const user: User = await getRepository(User).findOne(userId)
    const event: Event = await getRepository(Event).findOne(id)
    const data: any = JsonHandler.clearInput(req.body)

    if (!data.content || data.content === "") {
        const response: JsonHandler = JsonHandler.JsonResponse(false, "Votre message ne peut pas être vide")
        return res.send(response)
    }

    const message = new Message()
    message.content = data.content
    message.event = event


    message.user = user
    await getRepository(Message).save(message)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Message envoyé')
    res.send(response)
})

router.post('/:id/users', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const userId: number = req.user.id
    const user: User = await getRepository(User).findOne(userId)
    const event: Event = await getRepository(Event).findOne({
        where: {
            id: id
        },
        relations: ["users"]
    })

    event.users.forEach(userSubscribed => {
        //Fix: We don't go inside the condition
        if (userSubscribed === user) {
            const response = JsonHandler.JsonResponse(false, 'Vous êtes déjà inscrit à cet évènement')
            return res.send(response)
        }
    })

    event.users.push(user)

    await getRepository(Event).save(event)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Inscription à l\'évènement confirmée')
    res.send(response)
})

router.delete('/:id/users', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const userId: number = req.user.id
    const event: Event = await getRepository(Event).findOne({
        where: {
            id: id
        },
        relations: ["place", "users", "bands"]
    })

    event.users = event.users.filter(user => (
        user.id !== userId
    ))

    await getRepository(Event).save(event)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Désinscription à l\'évènement confirmée')
    res.send(response)


})

module.exports = router