import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CookiesConfig } from './modules/auth/config/cookies.config';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest template API')
    .setDescription('API Docs')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Access token',
    )
    .addCookieAuth(
      CookiesConfig.REFRESH_TOKEN_KEY,
      {
        type: 'http',
        in: 'Header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      CookiesConfig.REFRESH_TOKEN_KEY,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.enableCors({
    origin: process.env.CLIENT_URL || true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(
    helmet({
      referrerPolicy: {
        policy: 'no-referrer',
      },
      permittedCrossDomainPolicies: {
        permittedPolicies: 'all',
      },
      hidePoweredBy: true,
      xssFilter: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap().finally(() => {
  console.log(`Bootstrap finished`);
});
