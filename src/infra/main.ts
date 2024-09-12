import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { configSwagger } from './http/api-docs.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  configSwagger(app)

  await app.listen(port)
}
bootstrap()
