import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap', { timestamp: true });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = app.get(ConfigService).get('PORT');
  const node_env = app.get(ConfigService).get('NODE_ENV');
  await app.listen(port);
  logger.log(`Server started in ${node_env} on port ${port}`);
}
bootstrap();
