import express = require('express')
import { BandController } from '../../controller/BandController'
import { JsonHandler } from '../../services/JsonHandler'
const router = express.Router()
const bandController = new BandController('Band')

router.get('/', async (req: express.Request, res: express.Response) => {
    bandController.getAll(req, res)
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    bandController.getOne(req, res)
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const data: any = JsonHandler.clearInput(req.body)

    if (!data.name) {
        return bandController.handleBadRequest(res, "Champ 'nom' requis")
    }

    BandController.createBand(data, res)
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    bandController.deleteOne(req, res)
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const data: any = JsonHandler.clearInput(req.body)

    BandController.updateBand(data, req.params.id, res)
})

module.exports = router