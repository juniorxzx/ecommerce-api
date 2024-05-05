import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { updateDataUserDTO } from './dto/update-partial-data.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.User, Role.Admin)
  @Post()
  async createAccount(@Body() { email, name, password }: CreateAccountDTO) {
    return this.userService.createAccount(email, name, password);
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Roles(Role.User, Role.Admin)
  @Patch(':id')
  async updateDataUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateDataUserDTO,
  ) {
    return this.userService.updateDataUser(id, data);
  }
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteAccount(id);
  }
}
