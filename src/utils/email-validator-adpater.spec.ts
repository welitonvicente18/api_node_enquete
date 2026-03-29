import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail(): boolean {
        return true;
    }
}))

describe('EmailValidator Adapter', () => {
    test('Shoul return false if validator return false', () => {
        const sut = new EmailValidatorAdapter()

        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

        const isValid = sut.isValid('invalid_email')
        expect(isValid).toBe(false)
    })

    test('Shoul return true if validator return false', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(true)
    })
})