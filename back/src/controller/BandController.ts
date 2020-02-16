import { express } from 'express'
import { Band } from '../entity/Band'
import { getRepository } from 'typeorm'
import { JsonHandler } from "../services/JsonHandler";
import { BaseController } from './BaseController';

export class BandController extends BaseController {

    constructor(entityName:string){
        super(entityName)
    }

    public createBand = async (sanitizedData: any, res: express.Response) => {
        const band: Band = new Band()
        band.name = sanitizedData.name
        band.picture = sanitizedData.picture

        await getRepository(Band).save(band)

        const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe créé')
        res.send(response)
    }

    public updateBand = async (SanitizedData: any, bandId, res: express.Response) => {
        const band: Band = await getRepository(Band).findOne(bandId)

        band.name = SanitizedData.name
        band.picture = SanitizedData.picture
        await getRepository(Band).save(band)

        const response: JsonHandler = JsonHandler.JsonResponse(true, 'Groupe edité')
        res.send(response)
    }

}