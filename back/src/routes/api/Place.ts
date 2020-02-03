import { getRepository } from 'typeorm'
import express = require('express')
import { Place } from '../../entity/Place'
const router = express.Router()

router.get('/', async (req:express.Request, res:express.Response) => {
    const places:Place[] = await getRepository(Place).find()

    res.send(places)
})

router.get('/:id', async (req:express.Request, res:express.Response) => {
    const placeId:number = req.params.id
    const place:Place = await getRepository(Place).findOne(placeId)

    res.send(place)
})

router.post('/', async (req:express.Request, res:express.Response) => {
    const place:Place = new Place()
    place.name = req.body.name
    place.city = req.body.city

    await getRepository(Place).save(place)
    
    res.send(place)
})

router.delete('/:id', async (req:express.Request, res:express.Response) => {
    const placeId:number = req.params.id
    const place:Place = await getRepository(Place).findOne(placeId)

    await getRepository(Place).remove(place)

    res.send(place)
    
})

router.put('/:id', async (req:express.Request, res:express.Response) =>{
    const id:number = req.params.id
    const place:Place = await getRepository(Place).findOne(id)
    
    place.name = req.body.name
    place.city = req.body.city

    await getRepository(Place).save(place)
    
    res.send(place)
})

module.exports = router