import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AccessContorlService } from 'src/auth/shared/access-control.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, AccessContorlService],
})
export class UserModule {}
