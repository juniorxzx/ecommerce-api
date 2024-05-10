import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateAccountDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  @IsOptional()
  @IsEnum(Role)
  role: number;
}
