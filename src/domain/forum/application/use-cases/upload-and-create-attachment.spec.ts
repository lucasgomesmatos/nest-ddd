import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentTypeError } from './erros/invalid-attachment-type-error'
import { UploadAndUploadAttachmentUseCase } from './upload-and-create-attachment'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader
let sut: UploadAndUploadAttachmentUseCase

describe('Upload and create Attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndUploadAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from('image'),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0].fileName).toBe('profile.png')
  })

  it('should not be able to upload and create an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.txt',
      fileType: 'text/plain',
      body: Buffer.from('text'),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
