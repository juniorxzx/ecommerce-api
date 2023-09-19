import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository) {

    }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const emailValidator = await this.userRepository.valEmail(value)
        return !emailValidator
    }
}

export const Email = (options: ValidationOptions) => {
    return (object: Object, props: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: props,
            options: options,
            constraints: [],
            validator: EmailValidator
        })
    }
}