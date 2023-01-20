import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-fields-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredFields Validation', () => {
  test('Should returns a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ other_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })

  test('Should not returns an error if validation of nested value succeeds', async () => {
    const sut = new RequiredFieldValidation('object.field')
    const error = sut.validate({
      object: {
        field: 'any_value'
      }
    })
    expect(error).toBeFalsy()
  })

  test('Should returns a MissingParamError with correct nest field if validation fails', async () => {
    const sut = new RequiredFieldValidation('object.field')
    const error = sut.validate({
      object: {
        otherField: 'any_value'
      }
    })
    expect(error).toEqual(new MissingParamError('object.field'))
  })
})
