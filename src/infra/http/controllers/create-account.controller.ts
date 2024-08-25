import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/erros/student-already-exists-error';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { RegisterStudentUseCase } from './../../../domain/forum/application/use-cases/register-student-use-case';

const createAccountSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountSchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private readonly registerStudentUseCase: RegisterStudentUseCase) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async create(@Body() body: CreateAccountBodySchema) {
    const { email, name, password } = body


    const result = await this.registerStudentUseCase.execute({
      email,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

  }
}
