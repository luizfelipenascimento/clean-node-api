import { Collection } from 'mongodb'
import request from 'supertest'
import { AddSurveyModel } from '../../domain/usecases/add-survey'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'

let surveyCollection: Collection

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
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should returns 204 on add survey success', async () => {
    const response = await request(app)
      .post('/api/surveys')
      .send(makeFakeSurvey())

    console.log(response.body)
    expect(response.statusCode).toBe(204)
  })
})
