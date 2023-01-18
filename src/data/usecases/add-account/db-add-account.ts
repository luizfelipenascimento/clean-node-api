import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository, loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const addedAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(addedAccount))
  }
}
