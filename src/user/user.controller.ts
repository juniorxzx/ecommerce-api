import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'
import { ListUserDto } from "src/product/dto/listUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {

    }

    @Post()
    async createUser(
        @Body()
        dataUser: CreateUserDto
    ) {
        const userEntity = new UserEntity()

        userEntity.id = uuid()
        userEntity.email = dataUser.email
        userEntity.name = dataUser.name
        userEntity.password = dataUser.password

        this.userRepository.save(userEntity)
        return {
            user: new ListUserDto(userEntity.id, userEntity.name),
            message: "User created"
        }
    }

    @Get()
    async getUsers() {
        const users = await this.userRepository.get()
        const listUser = users.map(
            user => new ListUserDto(
                user.id,
                user.name
            )
        )
        return listUser
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() dataUser: UpdateUserDto) {
        const user = this.userRepository.update(id, dataUser)
        return {
            userUpdate: user,
            message: 'Usuário atualizado'
        }
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const user = await this.userRepository.remove(id)
        return {
            userremoved: user,
            message: 'Usuário deletado do nosso banco de dados.'
        }
    }
}