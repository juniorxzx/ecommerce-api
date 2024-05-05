import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
// import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Roles(Role.Admin)
  @Post('')
  async createNewProduct(@Body() { name, description, img }: CreateProductDTO) {
    return await this.productService.create(name, description, img);
  }
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
