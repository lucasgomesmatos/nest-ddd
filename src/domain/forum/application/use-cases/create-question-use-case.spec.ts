import { UniqueEntityId } from '@/core//entities/unique-entityId'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('create be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-id',
      title: 'Question title',
      content: 'Question content',
      attachmentsIds: ['attachment-1', 'attachment-2'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('attachment-1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('attachment-2'),
      }),
    ])
  })

  it('should persist attachments when creating a question', async () => {
    const result = await sut.execute({
      authorId: 'author-id',
      title: 'Question title',
      content: 'Question content',
      attachmentsIds: ['attachment-1', 'attachment-2'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryQuestionAttachmentRepository.items).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('attachment-1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('attachment-2'),
      }),
    ])
  })
})
