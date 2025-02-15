// src/swagger.setup.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NESTJS API APPLICATION')
    .setDescription('This is nestjs api')
    .setVersion('1.0')
    .addBearerAuth() // Add this line for Bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
