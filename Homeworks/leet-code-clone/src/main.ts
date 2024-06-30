import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './data/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ds = await dataSource.initialize().then(x => console.log(x.isInitialized));
  await app.listen(3000);
}
bootstrap();
