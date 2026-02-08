import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;
}
