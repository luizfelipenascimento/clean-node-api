import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should returns 200 signup', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          name: 'Luiz',
          email: 'luiz@email.com',
          password: '1234',
          passwordConfirmation: '1234'
        })

      expect(response.statusCode).toBe(200)
    })
  })
})
