import express = require('express')
import { getRepository } from 'typeorm'
import { Place } from '../../entity/Place'
import { JsonHandler } from '../../services/JsonHandler'
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const places: Place[] = await getRepository(Place).find()

    res.send(places)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const placeId: number = req.params.id
    const place: Place = await getRepository(Place).findOne(placeId)

    res.send(place)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const place: Place = new Place()
    const data: any = JsonHandler.clearInput(req.body)

    if (!data.name || data.name === "") {
        res.status(400)
        const response: JsonHandler = JsonHandler.JsonResponse(false, "Champ 'lieu' manquant",res.statuscode)
        return res.send(response)
    }

    place.name = data.name
    place.city = data.city
    await getRepository(Place).save(place)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Lieu créé')
    res.send(response)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const placeId: number = req.params.id
    const place: Place = await getRepository(Place).findOne(placeId)

    await getRepository(Place).remove(place)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Lieu supprimé')
    res.send(response)
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const place: Place = await getRepository(Place).findOne(id)
    const data: any = JsonHandler.clearInput(req.body)

    place.name = data.name
    place.city = data.city
    await getRepository(Place).save(place)

    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Lieu édité')
    res.send(response)
})

module.exports = router