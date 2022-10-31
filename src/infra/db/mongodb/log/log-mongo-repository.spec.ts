import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { LogMongoRepository } from './log-mongo-repository'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
  }

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
