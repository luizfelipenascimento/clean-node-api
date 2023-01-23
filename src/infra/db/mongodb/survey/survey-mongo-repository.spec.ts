import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helpers'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => ({
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'any_other_answer'
    }
  ],
  question: 'any_question'
})

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
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

  test('Should save a survey on success', async () => {
    const sut = makeSut()
    const fakeSurvey = makeFakeSurvey()
    await sut.add(fakeSurvey)
    const survey = await surveyCollection.findOne({ question: fakeSurvey.question })
    expect(survey).toBeTruthy()
  })
})
