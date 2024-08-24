import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository
    },
    PrismaAnswersRepository,
    PrismaQuestionCommentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerAttachmentsRepository

  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaAnswersRepository,
    PrismaQuestionCommentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerAttachmentsRepository,
    StudentsRepository
  ],
})
export class DatabaseModule { }