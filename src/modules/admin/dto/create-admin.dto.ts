import { Role } from '../entities/admin.entity';

export class CreateAdminDto {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}
