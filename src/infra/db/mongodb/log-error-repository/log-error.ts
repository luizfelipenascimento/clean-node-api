import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'

export class LogErrorMongoRepository implements LogErrorRepository {
  log: (stack: string) => Promise<void>
}
