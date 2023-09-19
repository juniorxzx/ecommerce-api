import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator"
import { Email } from "../validator/email.validator"

export class UpdateUserDto {

    @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
    @IsOptional()
    name: string

    @IsEmail(undefined, { message: 'O email informado é invalido' })
    @Email({ message: 'Email já cadastrado' })
    @IsOptional()
    email: string

    @MinLength(8, { message: 'A senha deve ter pelo menos que 8 caracteres' })
    @IsOptional()
    password: string

}