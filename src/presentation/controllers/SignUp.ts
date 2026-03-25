import { Controller, EmailValidator, HttpResponse, HttpRequest } from '../protocols'
import { MissingParamError, InvalidParamError } from '../erros'
import { badRequest, serverError } from '../helpers/http-helper'
import { AddAccount } from '../domain/usecases/add-account'

export class SignUpController implements Controller {
    private readonly emailValidador: EmailValidator
    private readonly addAccount: AddAccount
    constructor(emailValidador: EmailValidator, addAccount: AddAccount) {
        this.emailValidador = emailValidador
        this.addAccount= addAccount
    }

    handle(httpRequest: HttpRequest): HttpResponse {

        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, email, password, passwordConfirmation } = httpRequest.body

            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }

            const isValid = this.emailValidador.isValid(email)

            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

            this.addAccount.add({
                name,
                email,
                password
            })
        } catch (error) {
            return serverError()
        }
    }
}