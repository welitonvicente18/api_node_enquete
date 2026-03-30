import { DbAddAccount } from './db-add-account'
import { Encrypter, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols'

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_name',
                password: 'valid_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

interface SutTypes {
    sut: DbAddAccount,
    encrypterStub: Encrypter,
    addAccountRepositoryStub: AddAccountRepository
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

    test('should throw if Encrypter thows', () => {
        const { sut, encrypterStub } = makeSut();

        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => {
                reject(new Error())
            })
        )

        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        const promisse = sut.add(accountData)
        expect(promisse).rejects.toThrow()
    })

    test('should call AddccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_name',
            password: 'hashed_password'
        })
    })

    test('should thrwid Encypter throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => {
                reject(new Error())
            })
        )

        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        const promisse = sut.add(accountData)
        await expect(promisse).rejects.toThrow()
    })


    test('should return an account if on success', async () => {
        const { sut } = makeSut();

        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        const account = await sut.add(accountData)
        expect(account).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        })
    })

})
