import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers-use-case'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(
    private readonly fetchQuestionAnswersUseCase: FetchQuestionAnswersUseCase,
  ) {}

  @Get()
  async handle(
    @Param('questionId') questionId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchQuestionAnswersUseCase.execute({
      questionId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers

    // TODO: implementar value objects para os parâmetros de saída
    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}
