import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(question: QuestionDetails) {
    return {
      questionId: question.questionId.toValue(),
      authorId: question.authorId.toValue(),
      author: question.author,
      content: question.content,
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toValue(),
      attachments: question.attachments.map(AttachmentPresenter.toHTTP),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
