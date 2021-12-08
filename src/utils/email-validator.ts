import { EmailValidator } from '../presentation/protocols/email-validator'
import validor from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validor.isEmail(email)
  }
}
