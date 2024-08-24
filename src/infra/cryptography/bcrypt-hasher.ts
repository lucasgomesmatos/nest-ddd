import { HashCompare } from "@/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGTH)
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash)
  }

}