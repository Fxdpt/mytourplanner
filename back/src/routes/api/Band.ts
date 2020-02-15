import express = require('express')
import {BandController} from '../../controller/BandController'
import { JsonHandler } from '../../services/JsonHandler'

const router = express.Router()
const handler = new JsonHandler()

router.get('/', async (req: express.Request, res: express.Response) => {
    BandController.getAllBands(req,res)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    BandController.GetOneBand(req.params.id,res)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const data: any = JsonHandler.clearInput(req.body)

    if (!data.name) {
        return BandController.handleBadRequest(res,"Champ 'nom' requis")
    }

    BandController.createBand(data,res)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    BandController.deleteBand(req.params.id,res)
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const data: any = JsonHandler.clearInput(req.body)

    BandController.updateBand(data,req.params.id,res)
})

module.exports = router