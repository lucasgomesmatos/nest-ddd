import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AnswerCreateEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { Injectable } from '@nestjs/common'
import { SendNotificationUseCase } from './../use-cases/send-notification-use-case'

@Injectable()
export class OnAnswerCreatedSubscriber implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private SendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreateEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreateEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.SendNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em: ${question.title.substring(0, 40).concat('...')}`,
        content: answer.excerpt,
      })
    }
  }
}
