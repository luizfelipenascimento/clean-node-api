import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helpers'
import env from './config/env'

MongoHelper.connect(env.mongoURL).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
}).catch(console.error)
