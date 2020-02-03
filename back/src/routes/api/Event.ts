import { getRepository } from 'typeorm'
import express = require('express')
import { Place } from '../../entity/Place'
import { Event } from '../../entity/Event'
import { Band } from '../../entity/Band'
import { Message } from '../../entity/Message'
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

    const bands: Band[] = await getRepository(Band).findByIds(req.body.bands)
    const place: Place = await getRepository(Place).findOne(req.body.place)

    event.date = req.body.date
    event.bands = bands
    event.place = place


    await getRepository(Event).save(event)

    res.send(event)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const eventId: number = req.params.id
    const event: Event = await getRepository(Event).findOne(eventId)

    await getRepository(Event).remove(event)

    res.send(event)

})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const event: Event = await getRepository(Event).findOne(id)

    const bands: Band[] = await getRepository(Band).findByIds(req.body.bands)
    const place: Place = await getRepository(Place).findOne(req.body.place)

    event.date = req.body.date
    event.bands = bands
    event.place = place

    await getRepository(Event).save(event)

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

    const message = new Message()
    message.content = req.body.content
    message.event = event

    //TODO: Implement passport 
    message.user = req.user
})

module.exports = router