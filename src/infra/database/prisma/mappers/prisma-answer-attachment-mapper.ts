import { UniqueEntityId } from "@/core/entities/unique-entityId";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";


import { Attachment as PrismaAttachment } from "@prisma/client";

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment) {

    if(!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerAttachment.create({
      attachmentId: new UniqueEntityId(raw.id),
      answerId: new UniqueEntityId(raw.answerId),
    }, new UniqueEntityId(raw.id))
  }
 
}