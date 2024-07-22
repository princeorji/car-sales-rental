import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaleDto } from './dto/sale.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SaleService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async create(email: string, dto: SaleDto) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new ForbiddenException('User not found or unauthorized');
    }

    try {
      const sale = await this.prismaService.sale.create({
        data: {
          user: {
            connect: { email },
          },
          car: {
            connect: { id: dto.carId.toString() },
          },
          saleDate: new Date(dto.saleDate),
          salePrice: Number(dto.salePrice),
        },
      });

      return sale;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const sales = this.prismaService.sale.findMany();
    return sales;
  }

  async findOne(id: string) {
    const sale = await this.prismaService.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async update(id: string, email: string, dto: SaleDto) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new ForbiddenException('User not found or unauthorized');
    }

    try {
      const sale = await this.prismaService.sale.update({
        where: { id },
        data: {
          car: {
            connect: { id: dto.carId.toString() },
          },
          saleDate: new Date(dto.saleDate),
          salePrice: Number(dto.salePrice),
        },
      });

      return sale;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const sale = await this.prismaService.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return this.prismaService.sale.delete({
      where: { id },
    });
  }
}
