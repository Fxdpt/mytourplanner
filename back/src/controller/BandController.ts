import { express } from 'express'
import { Band } from '../entity/Band'
import { getRepository } from 'typeorm'
import { JsonHandler } from "../services/JsonHandler";
import { BaseController } from './BaseController';

export class BandController extends BaseController {

    static getAllBands = async (req: express.Request, res: express.Response) => {
        const bands: Band[] = await getRepository(Band).find()
        res.send(bands)
    }

    static GetOneBand = async (bandId, res: express.Response) => {
        const band: Band = await getRepository(Band).findOne(bandId)
        res.send(band)
    }

    static createBand = async (sanitizedData: any, res: express.Response) => {
        const band: Band = new Band()
        band.name = sanitizedData.name
        band.picture = sanitizedData.picture

        await getRepository(Band).save(band)

        const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe créé')
        res.send(response)
    }

    static deleteBand = async (bandId, res: express.Response) => {
        const band: Band = await getRepository(Band).findOne(bandId)

        await getRepository(Band).remove(band)

        const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe supprimé')
        res.send(response)
    }

    static updateBand = async (SanitizedData: any, bandId, res: express.Response) => {
        const band: Band = await getRepository(Band).findOne(bandId)

        band.name = SanitizedData.name
        band.picture = SanitizedData.picture
        await getRepository(Band).save(band)

        const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe edité')
        res.send(response)
    }

}