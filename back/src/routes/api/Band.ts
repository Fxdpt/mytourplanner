import { getRepository } from 'typeorm'
import express = require('express')
import { Band } from '../../entity/Band'
import { JsonHandler } from '../../services/JsonHandler'
const router = express.Router()


router.get('/', async (req: express.Request, res: express.Response) => {
    const bands: Band[] = await getRepository(Band).find()
    res.send(bands)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const bandId: number = req.params.id
    const band: Band = await getRepository(Band).findOne(bandId)

    res.send(band)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const band: Band = new Band()
    const data: any = JsonHandler.clearInput(req.body)

    if (!data.name) {
        const response: JsonHandler = JsonHandler.JsonResponse(false, "Champ 'nom' requis")
        return res.send(response)
    }

    band.name = data.name
    band.picture = data.picture

    await getRepository(Band).save(band)
    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe créé')
    res.send(response)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const bandId: number = req.params.id
    const band: Band = await getRepository(Band).findOne(bandId)

    await getRepository(Band).remove(band)
    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe supprimé')
    res.send(response)

})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const id: number = req.params.id
    const band: Band = await getRepository(Band).findOne(id)
    const data: any = JsonHandler.clearInput(req.body)
    band.name = data.name
    band.picture = data.picture

    await getRepository(Band).save(band)
    const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe edité')
    res.send(response)
})

module.exports = router