import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin, Role } from './entities/admin.entity';

@Injectable()
export class AdminSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    // 1. Create Default Super Admin
    const superAdminEmail = 'belalhossain22000@gmail.com';
    const superAdminExists = await this.adminRepository.findOne({ where: { email: superAdminEmail } });

    if (!superAdminExists) {
      const superAdmin = this.adminRepository.create({
        email: superAdminEmail,
        password: '123456',
        name: 'Super Admin',
        role: Role.SUPER_ADMIN,
      });
      await this.adminRepository.save(superAdmin);
      console.log('Admin seeder: Super Admin created!');
    }

    // 2. Create 10 additional Admins
    console.log('Admin seeder: Checking for additional 10 admins...');
    for (let i = 1; i <= 10; i++) {
      const email = `admin${i}@example.com`;
      const exists = await this.adminRepository.findOne({ where: { email } });

      if (!exists) {
        const admin = this.adminRepository.create({
          email,
          password: 'password123',
          name: `Admin User ${i}`,
          role: Role.ADMIN,
        });
        await this.adminRepository.save(admin);
        console.log(`Admin seeder: Created ${email}`);
      }
    }
    console.log('Admin seeder: Seeding process completed.');
  }
}
