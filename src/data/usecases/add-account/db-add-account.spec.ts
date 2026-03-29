import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}

interface SutTypes {
    sut: DbAddAccount,
    encrypterStub: Encrypter
}
describe('DbAddAccount Usecase', () => {
    test('should call Encrypter witch correct password', () => {

        const { sut, encrypterStub } = makeSut();

        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
})
