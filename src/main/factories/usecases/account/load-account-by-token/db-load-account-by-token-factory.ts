import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const loadAccountByTokenRepository = new AccountMongoRepository()
  const decrypter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(decrypter, loadAccountByTokenRepository)
}
