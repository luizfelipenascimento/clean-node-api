import bcrypt from 'bcrypt'
import { HashCompare } from '../../data/protocols/cryptography/hash-compare'
import { Hasher } from '../../data/protocols/cryptography/hasher'

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }

  async hash (value: string): Promise<String> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
