import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource, } from '@adminjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { databaseConfig } from './config/database.config';
import { adminJsConfig } from './config/adminjs.config';
import { DataSource } from 'typeorm';

// Register AdminJS TypeORM adapter
AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    // Database
    TypeOrmModule.forRoot(databaseConfig),

    // AdminJS
    AdminJSModule.createAdminAsync({
      useFactory: () => adminJsConfig,
    }),

    // Modules
    UserModule,
    AdminModule,
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly dataSource: DataSource) { }

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('🚀 Database connected successfully');
    }
  }
}

