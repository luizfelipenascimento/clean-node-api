import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import env from '../../config/env'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const hashCompare = new BcryptAdapter(salt)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, hashCompare, encrypter, accountMongoRepository)
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(dbAddAccount, validationComposite, dbAuthentication)
  const logErrorMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
