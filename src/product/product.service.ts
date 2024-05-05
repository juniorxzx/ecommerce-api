import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { EditProductDTO } from './dto/edit-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async create(name: string, description: string, img: string) {
    return await this.prisma.product.create({
      data: {
        name,
        img,
        description,
      },
    });
  }

  async edit(id: number, { name, description, img }: EditProductDTO) {
    const idExists = await this.checkId(id);

    if (!idExists) {
      throw new BadRequestException('id not found');
    } else {
      return await this.prisma.product.update({
        data: {
          name,
          description,
          img,
        },
        where: {
          id,
        },
      });
    }
  }
  async delete(id: number) {
    const idExists = await this.checkId(id);

    if (!idExists) {
      throw new BadRequestException('id not found');
    } else {
      return await this.prisma.product.delete({
        where: {
          id,
        },
      });
    }
  }

  async checkId(id: number) {
    const idExists = await this.prisma.product.findUnique({
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
