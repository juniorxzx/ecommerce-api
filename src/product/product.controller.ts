import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
// import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from 'src/file/file.service';
import { User } from 'src/decorators/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, RoleGuard)
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private fileService: FileService,
  ) {}

  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBearerAuth('access-token')
  @Post('')
  async createNewProduct(
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/' })],
      }),
    )
    photo: Express.Multer.File,
    @Body() { name, description, price, categoryId }: CreateProductDTO,
  ) {
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension = photo.originalname.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        'Apenas arquivos PNG, JPG e JPEG são permitidos.',
      );
    }

    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${name}.${fileExtension}`,
    );
    return await this.productService.create(
      name,
      description,
      price,
      photo,
      categoryId,
      path,
    );
  }

  @Roles(Role.User, Role.Admin)
  @Get('all-products')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  @Roles(Role.User, Role.Admin)
  @Get('categories')
  async getCategories() {
    return await this.productService.getCategories();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
