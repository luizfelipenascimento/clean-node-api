import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashCompare } from '../../protocols/cryptography/hash-compare'
import { TokenGenerator } from '../../protocols/cryptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompare: HashCompare
  private readonly tokenGenerator: TokenGenerator

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashCompare: HashCompare,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null as any
  }
}
