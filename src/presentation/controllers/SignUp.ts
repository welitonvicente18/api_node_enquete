import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../erros/missing-param-error'

export class SignUpController {
    handle(HttpRequest: HttpRequest): HttpResponse {
        if (!HttpRequest.body.name) {
            return {
                statusCode: 400,
                body: new MissingParamError('name')
            }
        }
        if (!HttpRequest.body.email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email')
            }
        }
    }
}