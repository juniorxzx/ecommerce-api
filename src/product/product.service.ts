import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { FileService } from 'src/file/file.service';
import { EditProductDTO } from './dto/edit-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async create(
    name: string,
    description: string,
    price: number,
    file: Express.Multer.File,
    categoryId: number,
    path: string,
  ) {
    try {
      await this.fileService.upload(file, path);
      console.log(categoryId);
      const product = await this.prisma.product.create({
        data: {
          name,
          img: [path],
          description,
          price,
          categoryId,
        },
      });

      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new BadRequestException('Failed to create product');
    }
  }

  async edit(id: number, updateData: EditProductDTO) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: { ...updateData },
      });

      return updatedProduct;
    } catch (error) {
      console.error('Error editing product:', error);
      throw new Error('Failed to update product');
    }
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany();

    return products;
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
