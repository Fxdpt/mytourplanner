export class JsonHandler {

    // return a JSON formatted Response
    // TODO: handle status Code
    static JsonResponse = (success:boolean, message:string) => {
        return({
            "success": success,
            "message": message,
        })
    }
}