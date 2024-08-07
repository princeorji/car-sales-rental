import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    try {
      const password = await argon.hash(dto.password);
      const user = await this.prismaService.user.create({
        data: {
          ...dto,
          password,
        },
      });

      return { message: `Welcome ${user.name}` };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email: dto.email },
      });
      const isCorrectPassword = await argon.verify(user.password, dto.password);

      if (!isCorrectPassword)
        throw new ForbiddenException('Incorrect Credentials');

      const token = await this.signToken(user.id, user.email, user.userType);

      return {
        data: {
          userId: user.id,
          access_token: token.access_token,
        },
      };
    } catch (error) {
      if (error.code == 'P2025')
        throw new ForbiddenException('Incorrect Credentials');
      throw error;
    }
  }

  private async signToken(
    userId: string,
    email: string,
    role: Role,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '120m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }
}
