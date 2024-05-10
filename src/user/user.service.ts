import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { updateDataUserDTO } from './dto/update-partial-data.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createAccount(
    email: string,
    name: string,
    dateOfBirth: Date,
    password: string,
  ) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same email address already exists',
      );
    }

    const hashPassword = await hash(password, 8);

    return await this.prisma.user.create({
      data: {
        email,
        name,
        dateOfBirth,
        password: hashPassword,
      },
    });
  }

  async getUserById(id: number) {
    const idExists = await this.checkId(id);

    if (!idExists) {
      throw new BadRequestException('id not found');
    } else {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    }
  }

  async updateDataUser(
    id: number,
    { email, name, password, role, dateOfBirth }: updateDataUserDTO,
  ) {
    const idExists = await this.checkId(id);

    if (!idExists) {
      throw new BadRequestException('id not found');
    } else {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          name,
          password,
          dateOfBirth,
          role,
        },
      });
    }
  }

  async deleteAccount(id: number) {
    const idExists = await this.checkId(id);

    if (!idExists) {
      throw new BadRequestException('id not found');
    } else {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    }
  }

  async checkId(id: number) {
    const idExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (idExists) {
      return true;
    }
    return false;
  }
}
