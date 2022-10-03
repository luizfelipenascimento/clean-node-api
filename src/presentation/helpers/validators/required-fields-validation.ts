import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    const inputFields = this.fieldName.split('.')
    for (const inputField of inputFields) {
      input = input[inputField]
    }
    if (!input) {
      return new MissingParamError(this.fieldName)
    }

    return null as any
  }
}
