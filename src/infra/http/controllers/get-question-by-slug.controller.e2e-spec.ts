import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { AppModule } from '../../app.module'
import { AttachmentFactory } from './../../../../test/factories/make-attachment'
import { QuestionAttachmentFactory } from './../../../../test/factories/make-question-attachment'

describe('Get question by slug Controller (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get<StudentFactory>(StudentFactory)
    questionFactory = moduleRef.get<QuestionFactory>(QuestionFactory)
    attachmentFactory = moduleRef.get<AttachmentFactory>(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get<QuestionAttachmentFactory>(
      QuestionAttachmentFactory,
    )
    jwt = moduleRef.get<JwtService>(JwtService)
    await app.init()
  })

  test('[GET] /questions/:slug', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      slug: Slug.create('question-1'),
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment({
      title: 'Attachment 1',
      url: 'http://attachment-1.com',
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('question')
    expect(response.body.question).toHaveProperty('title')

    expect(response.body).toEqual({
      question: expect.objectContaining({
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Attachment 1',
            url: 'http://attachment-1.com',
          }),
        ],
      }),
    })
  })
})
