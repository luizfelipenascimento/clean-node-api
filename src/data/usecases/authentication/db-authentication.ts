import {
  Authentication, AuthenticationModel, HashCompare, TokenGenerator,
  LoadAccountByEmailRepository, UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashCompare
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashCompare: HashCompare,
    tokenGenerator: TokenGenerator, updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashCompare
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null as any
  }
}
