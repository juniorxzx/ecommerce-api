import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { updateDataUserDTO } from './dto/update-partial-data.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createAccount(
    @Body() { email, name, password, dateOfBirth }: CreateAccountDTO,
  ) {
    const formattedDateOfBirth = new Date(dateOfBirth);
    return this.userService.createAccount(
      email,
      name,
      formattedDateOfBirth,
      password,
    );
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateDataUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateDataUserDTO,
  ) {
    return this.userService.updateDataUser(id, data);
  }

  @Delete(':id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteAccount(id);
  }
}
