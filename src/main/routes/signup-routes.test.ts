import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'

describe('Signup Routes', () => {
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

  test('Should returns an account on success', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        name: 'Luiz',
        email: 'luiz@email.com',
        password: '1234',
        passwordConfirmation: '1234'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeTruthy()
    expect(response.body.password).toBeTruthy()
    expect(response.body.name).toBe('Luiz')
    expect(response.body.email).toBe('luiz@email.com')
  })
})
