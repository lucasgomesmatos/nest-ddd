import { UniqueEntityId } from "@/core/entities/unique-entityId";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

import { Prisma, Comment as PrismaAnswerComment } from "@prisma/client";

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaAnswerComment) {

    if(!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create({
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      answerId: new UniqueEntityId(raw.answerId),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }

  static toPersistence(answerComment: AnswerComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}