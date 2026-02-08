import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const admin = this.adminRepository.create(createAdminDto);
      return await this.adminRepository.save(admin);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Admin with this email already exists');
      }
      throw new InternalServerErrorException('Error creating admin');
    }
  }

  async findAll() {
    try {
      return await this.adminRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching admins');
    }
  }

  async findOne(id: string) {
    try {
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new NotFoundException(`Admin with ID ${id} not found`);
      }
      return admin;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error finding admin');
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.findOne(id);
      Object.assign(admin, updateAdminDto);
      return await this.adminRepository.save(admin);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error.code === '23505') {
        throw new ConflictException('Admin with this email already exists');
      }
      throw new InternalServerErrorException('Error updating admin');
    }
  }

  async remove(id: string) {
    try {
      const admin = await this.findOne(id);
      await this.adminRepository.remove(admin);
      return { message: `Admin with ID ${id} removed successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error removing admin');
    }
  }
}
