import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../../app.module'

describe('Get question by slug Controller (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get<PrismaService>(PrismaService)
    jwt = moduleRef.get<JwtService>(JwtService)
    await app.init()
  })

  test('[GET] /questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.create({
      data: {
        title: 'How to create a question 2?',
        content:
          'I want to create a question, but I do not know how to do it.',
        authorId: user.id,
        slug: 'question-1',
      },
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('question')
  })
})
