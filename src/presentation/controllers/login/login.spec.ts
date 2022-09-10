import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { LoginController } from './login'

describe('LoginController', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })
})
