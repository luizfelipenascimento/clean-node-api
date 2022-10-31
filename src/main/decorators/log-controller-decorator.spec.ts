import { serverError, ok } from '../../presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { AccountModel } from '../../domain/models/account'

describe('LogController Decorator', () => {
  const makeControllerStub = (): Controller => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve(ok(makeFakeAccount())))
      }
    }
    return new ControllerStub()
  }

  const makeLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
      async logError (stack: string): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    return new LogErrorRepositoryStub()
  }

  const makeFakeRequest = (): HttpRequest => ({
    body: {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@mail.com',
      passwordConfirmation: 'any_password'
    }
  })

  const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    password: 'valid_password',
    email: 'valid_email@mail.com'
  })

  const makeFakeServerError = (): HttpResponse => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    return serverError(fakeError)
  }

  interface SutTypes {
    sut: LogControllerDecorator
    logErrorRepositoryStub: LogErrorRepository
    controllerStub: Controller
  }

  const makeSut = (): SutTypes => {
    const controllerStub = makeControllerStub()
    const logErrorRepositoryStub = makeLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return {
      sut,
      logErrorRepositoryStub,
      controllerStub
    }
  }

  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(makeFakeRequest())
    expect(logErrorSpy).toHaveBeenCalledWith('any_stack')
  })
})
