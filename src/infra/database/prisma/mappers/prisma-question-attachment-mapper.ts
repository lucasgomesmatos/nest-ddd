import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment) {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
