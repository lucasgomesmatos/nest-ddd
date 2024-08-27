import { UniqueEntityId } from "@/core/entities/unique-entityId";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Prisma, Answer as PrismaAnswer } from "@prisma/client";

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer) {
    return Answer.create({
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      createdAt: raw.createdAt,
      questionId: new UniqueEntityId(raw.questionId),
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }

  static toPersistence(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}