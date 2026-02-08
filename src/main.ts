import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Add body parser back but ONLY for non-admin routes
  app.use((req, res, next) => {
    if (req.url.startsWith('/admin')) {
      return next();
    }
    express.json()(req, res, next);
  });
  
  app.use((req, res, next) => {
    if (req.url.startsWith('/admin')) {
      return next();
    }
    express.urlencoded({ extended: true })(req, res, next);
  });

  await app.listen(3000);
}
bootstrap();
