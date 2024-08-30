import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'
import { AppModule } from '../../app.module'

describe('Authenticate Controller (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get<StudentFactory>(StudentFactory)
    await app.init()
  })

  test('[POST] /sessions', async () => {
    const password = '123456'
    await studentFactory.makePrismaStudent({
      email: 'johndoe@example.com',
      password: await hash(password, 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password,
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('access_token')
  })
})
