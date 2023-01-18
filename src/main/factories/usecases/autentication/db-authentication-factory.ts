import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import env from '../../../config/env'
import { Authentication } from '../../../../domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const encrypter = new JwtAdapter(env.jwtSecret)
  const hashCompare = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, hashCompare, encrypter, accountMongoRepository)
}
