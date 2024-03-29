import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class CompareFieldsValidation implements Validation {
  private readonly FieldName: string
  private readonly FieldToCompareName: string

  constructor (FieldName: string, FieldToCompareName: string) {
    this.FieldName = FieldName
    this.FieldToCompareName = FieldToCompareName
  }

  validate (input: any): Error {
    if (input[this.FieldName] !== input[this.FieldToCompareName]) {
      return new InvalidParamError(this.FieldToCompareName)
    }
    return null as any
  }
}
