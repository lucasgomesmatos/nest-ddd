import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student-use-case'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question-use-case'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question-use-case'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions-use-case'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug-use-case'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student-use-case'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionsController } from './controllers/create-question.controller'
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
    EditQuestionsController
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase
  ],

})
export class HttpModule { }
