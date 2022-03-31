import { AddAccountRepository } from '../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: new ObjectId(result.insertedId) })
    if (!account) throw new Error()
    const { _id, ...accountWithoutId } = account
    return Object.assign(accountWithoutId, { id: String(_id) }) as AccountModel
  }
}
