import { getRepository } from 'typeorm'
import express = require('express')
import { Place } from '../../entity/Place'
import { Event } from '../../entity/Event'
import { Band } from '../../entity/Band'
import { Message } from '../../entity/Message'
import { JsonHandler } from '../../services/JsonHandler'
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const events: Event[] = await getRepository(Event).find()

    res.send(events)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const eventId: number = req.params.id
    const event: Event = await getRepository(Event).findOne(eventId)

    res.send(event)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const event: Event = new Event()
    const data: any = JsonHandler.clearInput(req.body)
    const bands: Band[] = await getRepository(Band).findByIds(data.bands)
    const place: Place = await getRepository(Place).findOne(data.place)

    if(!data.date){
        const response: JsonHandler= JsonHandler.JsonResponse(false,'Une date doit obligatoirement être spécifiée')
        return res.send(response)
    }

    event.date = data.date
    event.bands = bands
    event.place = place

    await getRepository(Event).save(event)

    const response: JsonHandler= JsonHandler.JsonResponse(true,'Evènement créé')
    res.send(response)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const eventId: number = req.params.id
    const event: Event = await getRepository(Event).findOne(eventId)

    await getRepository(Event).remove(event)

    const response: JsonHandler= JsonHandler.JsonResponse(true,'Evènement supprimé')
    res.send(response)
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const event: Event = await getRepository(Event).findOne(id)
    const data: any = JsonHandler.clearInput(req.body) 
    const bands: Band[] = await getRepository(Band).findByIds(data.bands)
    const place: Place = await getRepository(Place).findOne(data.place)

    event.date = data.date
    event.bands = bands
    event.place = place

    await getRepository(Event).save(event)

    const response: JsonHandler= JsonHandler.JsonResponse(true,'Evènement édité')
    res.send(event)
})

router.get('/:id/messages', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const event: Event = await getRepository(Event).findOne(id)
    const messages: Message[] = await getRepository(Message).find({ where : {event:event}})
    
    res.send(messages)
})

router.post('/:id/messages', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const event: Event = await getRepository(Event).findOne(id)
    const data: any = JsonHandler.clearInput(req.body)

    if(!data.message || data.message === ""){
        const response: JsonHandler= JsonHandler.JsonResponse(false,"Votre message ne peut pas être vide")
        return res.send(response)
    }

    const message = new Message()
    message.content = data.content
    message.event = event

    //TODO: Get Current user 
    message.user = req.user

    const response: JsonHandler= JsonHandler.JsonResponse(true,'Message envoyé')
    res.send(response)
})

module.exports = router