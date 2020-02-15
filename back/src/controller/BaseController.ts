import { express } from 'express'
import { JsonHandler } from '../services/JsonHandler'

export class BaseController {

    static handleBadRequest(res: express.Response, message: string) {
        res.status(400)
        const response = JsonHandler.JsonResponse(false, message, res.statusCode)
        return res.send(response)
    }
}