import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main', { timestamp: true });

  const appContex = await NestFactory.createApplicationContext(AppModule);
  const configService = appContex.get(ConfigService);
  const port = configService.get<number>('PORT');
  const natsUrl = configService.get<string>('NATS_URL');
  appContex.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: natsUrl,
      },
    },
  );


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

 await app.listen();
 logger.log(`ORDERS MICROSERVICE is running on: ${port}`);
}
bootstrap();
