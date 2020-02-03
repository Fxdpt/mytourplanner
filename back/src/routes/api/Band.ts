import { getRepository } from 'typeorm'
import express = require('express')
import { Band } from '../../entity/Band'
const router = express.Router()


router.get('/', async (req:express.Request, res:express.Response) => {
    const bands:Band[] = await getRepository(Band).find()

    res.send(bands)
})

router.get('/:id', async (req:express.Request, res:express.Response) => {
    const bandId:number = req.params.id
    const band:Band = await getRepository(Band).findOne(bandId)

    res.send(band)
})

router.post('/', async (req:express.Request, res:express.Response) => {
    const band:Band = new Band()
    band.name = req.body.name
    band.picture = req.body.picture

    await getRepository(Band).save(band)
    
    res.send(band)
})

router.delete('/:id', async (req:express.Request, res:express.Response) => {
    const bandId:number = req.params.id
    const band:Band = await getRepository(Band).findOne(bandId)

    await getRepository(Band).remove(band)

    res.send(band)
    
})

router.put('/:id', async (req:express.Request, res:express.Response) =>{
    const id:number = req.params.id
    const band:Band = await getRepository(Band).findOne(id)
    
    band.name = req.body.name
    band.picture = req.body.picture

    await getRepository(Band).save(band)
    
    res.send(band)
})

module.exports = router