import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator"
import { Email } from "../validator/email.validator"

export class CreateUserDto {

    @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
    name: string

    @IsEmail(undefined, { message: 'O email informado é invalido' })
    @Email({ message: 'Email já cadastrado' })
    email: string

    @MinLength(8, { message: 'A senha deve ter pelo menos que 8 caracteres' })
    password: string

}