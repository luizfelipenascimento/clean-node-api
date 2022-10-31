import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const encrypter = new JwtAdapter(env.jwtSecret)
  const hashCompare = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const bdAuthentication = new DbAuthentication(accountMongoRepository, hashCompare, encrypter, accountMongoRepository)
  const loginController = new LoginController(bdAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
