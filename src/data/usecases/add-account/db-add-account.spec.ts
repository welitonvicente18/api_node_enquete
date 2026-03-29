import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
    test('should call Encrypter witch correct password', () => {
        class EncrypterStub {
            encrypt(value: string): Promise<string> {
                return new Promise(resolve => resolve('hashed_password'))
            }
        }
        const encrypterStud = new EncrypterStub()

        const sut = new DbAddAccount(encrypterStud)
        const encryptSpy = jest.spyOn(encrypterStud, 'encrypt')

        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
})
