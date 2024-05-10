import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  imports: [],
  exports: [FileService],
  controllers: [],
  providers: [FileService],
})
export class FileModule {}
