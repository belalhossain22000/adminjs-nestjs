import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
// Register AdminJS TypeORM adapter
AdminJS.registerAdapter({ Database, Resource });

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN;
  }
  return null;
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),

    UserModule,

    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [User],
      },
      auth: {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'supersecret',
      },
      sessionOptions: {
        resave: true,
        saveUninitialized: true,
        secret: 'supersecret',
      },
    }),
  ],
})
export class AppModule {}

