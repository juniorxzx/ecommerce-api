import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, FileModule],
  exports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
