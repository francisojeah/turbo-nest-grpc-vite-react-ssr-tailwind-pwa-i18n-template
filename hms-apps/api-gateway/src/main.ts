import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESCRIPTION)
    .setVersion(process.env.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  try {
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        baseUrl: '/v1',
      },
    });
  } catch (error) {
    this.logger.error(error);
  }
  
  await app.listen(
    process.env.APP_SERVER_LISTEN_PORT,
    process.env.APP_SERVER_LISTEN_IP,
  );

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
