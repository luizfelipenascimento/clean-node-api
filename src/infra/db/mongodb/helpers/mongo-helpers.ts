import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {

  client: MongoClient,
  uri: String,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    return this.client.db().collection(name)
  },

  map (document: any): any {
    const { _id, ...documentWithoutId } = document
    return Object.assign({}, documentWithoutId, { id: String(_id) })
  }
}
