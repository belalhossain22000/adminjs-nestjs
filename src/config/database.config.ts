import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/user/entities/user.entity';
import { Admin } from '../modules/admin/entities/admin.entity';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    entities: [User, Admin],
    synchronize: true,
};
