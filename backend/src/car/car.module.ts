import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AccessContorlService } from 'src/auth/shared/access-control.service';

@Module({
  controllers: [CarController],
  providers: [CarService, PrismaService, JwtService, AccessContorlService],
})
export class CarModule {}
