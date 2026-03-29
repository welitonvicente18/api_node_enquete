import { EmailValidatorAdapter } from './email-validator'
describe('EmailValidator Adapter', () => {
    test('Shoul return false if validator retns false', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(false)
    })
})