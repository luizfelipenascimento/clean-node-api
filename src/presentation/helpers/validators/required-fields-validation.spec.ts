import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-fields-validation'

describe('RequiredFields Validation', () => {
  test('Should returns a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ other_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
