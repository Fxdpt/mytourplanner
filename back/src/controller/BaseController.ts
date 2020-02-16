import { express } from 'express'
import { getRepository } from 'typeorm'
import { JsonHandler } from '../services/JsonHandler'

export class BaseController {

    protected entityName: string

    constructor(entityName: string) {
        if (this.constructor === BaseController) {
            throw new TypeError('Abstract class "BaseController" cannot be instanciated direcly')
        }

        this.entityName = entityName
    }

    public getAll = async (req: express.Request, res: express.Response) => {
        const results = await getRepository(this.entityName).find()

        res.send(results)
    }

    public getOne = async (req: express.Request, res: express.Response) => {
        const params = this.handleParams(req, res)
        const id = params.id
        const result = await getRepository(this.entityName).findOne(id)

        if (!result) {
            return this.handleNotFound(res, `Pas de résultat pour l'id: ${id}`)
        }

        res.send(result)
    }

    public deleteOne = async (req: express.Request, res: express.Response) => {
        const params = this.handleParams(req,res)
        const id = params.id
        const result = await getRepository(this.entityName).findOne(id)

        await getRepository(this.entityName).remove(result)

        const response: JsonHandler = JsonHandler.JsonResponse(true, `${this.entityName} supprimé`)
        res.send(response)
    }

    private handleNotFound = (res: express.Response, message: string) => {
        res.status(404)
        const response = JsonHandler.JsonResponse(false, message, res.statusCode)

        return res.send(response)
    }

    private handleParams = (req: express.Request, res: express.Response) => {
        let params: Object = {}

        if (!req.params) {
            return this.handleBadRequest(res, 'Missing Parameter')
        }
        if (req.params.id) {
            const id: number = parseInt(req.params.id, 10)
            if (isNaN(id)) {
                return this.handleBadRequest(res, 'Parameter must be a number')
            }
            params = {id:id}
        }

        return params
    }

    public handleBadRequest = (res: express.Response, message: string) => {
        res.status(400)
        const response = JsonHandler.JsonResponse(false, message, res.statusCode)

        return res.send(response)
    }
}