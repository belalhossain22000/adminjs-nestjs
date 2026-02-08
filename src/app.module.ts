import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AdminModule } from './modules/admin/admin.module';
import { Admin } from './modules/admin/entities/admin.entity';


// Register AdminJS TypeORM adapter
AdminJS.registerAdapter({ Database, Resource });

const DEFAULT_ADMIN = {
  email: 'belalhossain22000@gmail.com',
  password: '123456',
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
      entities: [User, Admin],
      synchronize: true,
    }),

    UserModule,

    AdminJSModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: User,
              options: {},
            },
            {
              resource: Admin,
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

    AdminModule,
  ],
})
export class AppModule {}

