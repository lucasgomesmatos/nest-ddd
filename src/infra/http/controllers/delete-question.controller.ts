import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question-use-case';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common';

@Controller('/questions/:id')
export class DeleteQuestionsController {
  constructor(private readonly deleteQuestionUseCase: DeleteQuestionUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {

    const userId = user.sub

    const result = await this.deleteQuestionUseCase.execute({
      authorId: userId,
      questionId
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
