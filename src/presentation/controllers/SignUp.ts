import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../erros'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator';

export class SignUpController implements Controller {
    private readonly emailValidador: EmailValidator

    constructor(emailValidador: EmailValidator) {
        this.emailValidador = emailValidador
    }

    handle(httpRequest: HttpRequest): HttpResponse {

        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const isValid = this.emailValidador.isValid(httpRequest.body.email)

            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        } catch (error) {
            return serverError()
        }
    }
}