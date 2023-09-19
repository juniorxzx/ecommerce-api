import { Injectable, Put } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    private searchForId(id: string) {
        const user = this.users.find(
            usersaved => usersaved.id === id

        )
        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        return user
    }

    async save(user: UserEntity) {
        this.users.push(user)
        console.log(this.users)
    }

    async get() {
        return this.users
    }

    @Put()
    async update(id: string, dataUser: Partial<UserEntity>) {
        const user = this.searchForId(id)
        Object.entries(dataUser).forEach(
            ([key, value]) => {
                if (key === 'id') {
                    return
                }
                user[key] = value
            })
        return user
    }

    async valEmail(email: string) {
        const valUser = this.users.find(
            user => user.email === email
        )

        return valUser !== undefined
    }

    async remove(id: string) {
        const user = this.searchForId(id)
        this.users= this.users.filter(
            usersaved => usersaved.id !== id 
        )
        return user
    }
}