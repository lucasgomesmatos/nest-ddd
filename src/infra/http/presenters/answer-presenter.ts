import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerPresenter {
  static toHTTP(answer: Answer) {
    return {
      id: answer.id.toValue(),
      content: answer.content,
      questionId: answer.questionId.toValue(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
