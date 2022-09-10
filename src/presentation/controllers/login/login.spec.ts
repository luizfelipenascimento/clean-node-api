import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { LoginController } from './login'

describe('LoginController', () => {
  interface SutTypes {
    sut: LoginController
  }

  const makeSut = (): SutTypes => {
    const sut = new LoginController()
    return {
      sut
    }
  }

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })
})
