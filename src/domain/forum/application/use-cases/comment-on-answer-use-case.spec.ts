import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { InMemoryAnswerAttachmentRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer-use-case'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let sut: CommentOnAnswerUseCase

describe('Create Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('create be able to create a answer comment', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-id',
      answerId: newAnswer.id.toString(),
      content: 'Answer content',
    })

    expect(result.isRight()).toBeTruthy()
  })

  it('should not be able to create a answer comment if the answer does not exist', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'invalid-answer-id',
      authorId: 'author-id',
      content: 'new content',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
