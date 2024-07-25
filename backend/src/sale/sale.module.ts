import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AccessContorlService } from 'src/auth/shared/access-control.service';

@Module({
  controllers: [SaleController],
  providers: [SaleService, PrismaService, JwtService, AccessContorlService],
})
export class SaleModule {}
