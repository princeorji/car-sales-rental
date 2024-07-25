import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AccessContorlService } from 'src/auth/shared/access-control.service';

@Module({
  controllers: [RentalController],
  providers: [RentalService, PrismaService, JwtService, AccessContorlService],
})
export class RentalModule {}
