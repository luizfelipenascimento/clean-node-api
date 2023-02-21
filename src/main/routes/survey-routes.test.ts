import { Collection } from 'mongodb'
import request from 'supertest'
import { AddSurveyModel } from '../../domain/usecases/add-survey'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../../main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      answer: 'answer_1',
      image: 'http://image-name.com'
    },
    {
      answer: 'answer_2'
    }
  ]
})

describe('POST /surveys', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should returns 403 on add survey without accessToken', async () => {
    const response = await request(app)
      .post('/api/surveys')
      .send(makeFakeSurvey())

    console.log(response.body)
    expect(response.statusCode).toBe(403)
  })

  test('Should returns 204 on add survey if valid accessToken is provided', async () => {
    const createdAccount = await accountCollection.insertOne({
      name: 'Luiz',
      email: 'luiz@mail.com',
      password: '1234',
      role: 'admin'
    })

    const id = createdAccount.insertedId
    const accessToken = sign({ id }, env.jwtSecret)

    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken
      }
    })

    const response = await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send(makeFakeSurvey())

    console.log(response.body)
    expect(response.statusCode).toBe(204)
  })
})
