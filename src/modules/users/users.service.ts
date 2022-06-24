import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiException } from '../../shared/exceptions/api.exception';
import { UpdateUserUsernameDto } from './dto/update-user-username.dto';
import { UserDto } from './dto/user.dto';
import { UserStatus } from './interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  async findAll(
    page: number,
    items: number,
    searchQuery: string,
    status?: UserStatus,
  ) {
    const users = await this.usersRepository.find({
      select: {
        email: true,
        username: true,
        banReason: true,
        locale: true,
        createdAt: true,
      },
      where: {
        status: status,
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        sessionRefreshTokens: true,
      },
    });

    if (!user) {
      throw ApiException.NotFound();
    }

    return user;
  }

  async update(updateUserDto: UpdateUserDto, userId: string) {
    throw ApiException.NotImplemented();
  }

  async updateEmail(updateUserEmailDto: UpdateUserEmailDto, userId: string) {
    console.log(userId);
    throw ApiException.NotImplemented();
  }

  async updateUsername(
    updateUserUsernameDto: UpdateUserUsernameDto,
    userId: string,
  ) {
    throw ApiException.NotImplemented();
  }

  async updatePassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
    userId: string,
  ) {
    throw ApiException.NotImplemented();
  }

  async remove(userId: string) {
    throw ApiException.NotImplemented(userId);
  }

  async getAuthAttemptsInfo(userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        failedAttempts: true,
        lastAuthAttemptAt: true,
      },
    });

    return {
      failedAttempts: user.failedAttempts,
      lastAuthAttemptAt: user.lastAuthAttemptAt,
    };
  }

  async setPasswordUpdatedDateNow(userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.passwordUpdatedAt = new Date();
    await this.usersRepository.save(user);
  }

  async setUsernameUpdatedDateNow(userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.usernameUpdatedAt = new Date();
    await this.usersRepository.save(user);
  }

  async setEmailUpdatedDateNow(userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.emailUpdatedAt = new Date();
    await this.usersRepository.save(user);
  }

  async setStatusUpdatedDateNow(userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.statusUpdatedAt = new Date();
    await this.usersRepository.save(user);
  }
}
