import { AddSurvey, AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helpers'

export class SurveyMongoRepository implements AddSurvey {
  async add (data: AddSurveyModel): Promise<void> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.insertOne(data)
  }
}
