import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from './../../../../../test/repositories/in-memory-question-attachments-repository'

import { makeAttachment } from 'test/factories/make-attachment'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug-use-case'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()

    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryStudentsRepository,
      inMemoryAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    inMemoryStudentsRepository.items.push(student)

    const attachment = makeAttachment({
      title: 'Attachment title',
      url: 'http://attachment.com',
    })

    inMemoryAttachmentsRepository.items.push(attachment)

    const newQuestion = makeQuestion({
      slug: Slug.create('question-title'),
      authorId: student.id,
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const questionAttachment = makeQuestionAttachment({
      questionId: newQuestion.id,
      attachmentId: attachment.id,
    })

    inMemoryQuestionAttachmentRepository.items.push(questionAttachment)

    const result = await sut.execute({
      slug: 'question-title',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Attachment title',
            url: 'http://attachment.com',
          }),
        ],
      }),
    })
  })
})
