import { Express, Router } from 'express'
import { readdirSync } from 'fs'

const path = 'src/main/routes/'

export default (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  readdirSync(path).filter(f => /.routes\.ts/.test(f)).map(async file => {
    (await import('../../../' + path + file)).default(router)
  })
}
