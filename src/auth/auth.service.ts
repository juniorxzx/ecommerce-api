import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  createToken(user: User) {
    return {
      acessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token);
      console.log(data);
      return data;
    } catch (error) {
      throw new UnauthorizedException('token is not valid');
    }
  }

  isValid(token: string) {
    try {
      const data = this.jwtService.verify(token);
      if (data) {
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException('token is not valid');
    }
  }
  async register({ email, name, dateOfBirth, password }: AuthRegisterDTO) {
    const formattedDateOfBirth = new Date(dateOfBirth);
    const user = await this.userService.createAccount(
      email,
      name,
      formattedDateOfBirth,
      password,
    );
    const token = await this.createToken(user);
    return {
      token,
      user: user,
    };
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const token = await this.createToken(user);
    return {
      token,
      user: user.id,
    };
  }
}
