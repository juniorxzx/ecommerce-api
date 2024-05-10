import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsString({ each: true })
  img: string[];

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  categoryId: number;
}
