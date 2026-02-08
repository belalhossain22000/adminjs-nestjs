import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

// Register AdminJS TypeORM adapter
AdminJS.registerAdapter({ Database, Resource });

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve({ email: DEFAULT_ADMIN.email });
  }
  return Promise.resolve(null);
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

    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: User,
              options: {},
            },
          ],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'super-secret-and-very-long-password-for-adminjs-cookie',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'super-secret-and-very-long-session-secret-for-adminjs',
        },
      }),
    }),
  ],
})
export class AppModule {}

