
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer-use-case';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common';

@Controller('/answers/:id')
export class DeleteAnswersController {
  constructor(private readonly deleteAnswerUseCase: DeleteAnswerUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswerUseCase.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
