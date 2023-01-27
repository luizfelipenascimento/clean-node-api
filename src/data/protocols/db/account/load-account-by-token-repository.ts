import { AccountModel } from '../../../usecases/add-account/db-add-account-protocols'

export interface LoadAccountByTokenRepository {
  loadByToken (accessToken: string, role?: string): Promise<AccountModel>
}
