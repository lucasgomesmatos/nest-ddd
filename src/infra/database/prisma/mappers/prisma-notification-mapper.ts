import { UniqueEntityId } from '@/core/entities/unique-entityId'

import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { Prisma, Notification as PrismaNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        readAt: raw.readAt,
        recipientId: new UniqueEntityId(raw.recipientId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
      readAt: notification.readAt,
      title: notification.title,
      content: notification.content,
      createdAt: notification.createdAt,
    }
  }
}
