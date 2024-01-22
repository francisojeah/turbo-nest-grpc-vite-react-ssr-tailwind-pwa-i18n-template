// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';
import {
  CreateUserDto,
  FindOneUserByPrimaryEmailAddressDto,
  PaginationDto,
  UpdateUserDto,
  Users,
  UsersServiceController,
} from '@common/hms-lib';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements UsersServiceController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
      primaryEmailAddress: createUserDto.primaryEmailAddress,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      backupEmailAddress: '',
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
      passwordHash: randomUUID(),
    };

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = this.userRepository.find();
    return users ;
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async remove(id:string): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    await this.userRepository.remove(user);
    return user;
  }

  queryUsers(request: Observable<PaginationDto>): Observable<Users> {
    // Implement your query logic here using the observable
    // ...
    return new Observable<Users>(); // Return an observable
  }

  async findOneUserByPrimaryEmailAddress(
    primaryEmailAddress:string
  ): Promise<User> {
    return this.userRepository.findOne({ where: { primaryEmailAddress } });
  }
}
