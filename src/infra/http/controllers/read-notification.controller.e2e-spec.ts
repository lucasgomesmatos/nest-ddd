import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'
import { AppModule } from '../../app.module'
import { NotificationFactory } from './../../../../test/factories/make-notification'

describe('Read Notification Controller (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let notificationFactory: NotificationFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, NotificationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get<StudentFactory>(StudentFactory)
    notificationFactory =
      moduleRef.get<NotificationFactory>(NotificationFactory)
    prisma = moduleRef.get<PrismaService>(PrismaService)
    jwt = moduleRef.get<JwtService>(JwtService)
    await app.init()
  })

  test('[PATCH /notifications/:notificationId/read] - should mark a notification as read', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const notification = await notificationFactory.makePrismaNotification({
      recipientId: user.id,
    })

    const notificationId = notification.id.toString()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(204)

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: {
        id: notificationId,
      },
    })

    expect(notificationOnDatabase?.readAt).toEqual(expect.any(Date))
  })
})
