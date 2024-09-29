import { OnAnswerCreatedSubscriber } from '@/domain/notification/application/subscribers/on-answer-created-subscriber'
import { OnQuestionBestAnswerChosenSubscriber } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen-subscriber'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification-use-case'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreatedSubscriber,
    OnQuestionBestAnswerChosenSubscriber,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
