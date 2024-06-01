import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [RentalController],
  providers: [RentalService, PrismaService, UserService],
})
export class RentalModule {}
