import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question-use-case'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student-use-case'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question-use-case'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question-use-case'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question-use-case'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions-use-case'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug-use-case'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student-use-case'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'

import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer-use-case'
import { AnswerQuestionsController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionsController } from './controllers/create-question.controller'
import { DeleteQuestionsController } from './controllers/delete-question.controller'
import { EditAnswersController } from './controllers/edit-answer.controller'
import { EditQuestionsController } from './controllers/edit-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionsController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionsController,
    DeleteQuestionsController,
    AnswerQuestionsController,
    EditAnswersController
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase
  ],

})
export class HttpModule { }
