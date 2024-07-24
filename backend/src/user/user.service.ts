import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },

      include: {
        sales: {
          include: {
            car: true,
          },
        },
        rentals: {
          include: {
            car: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      data: {
        select: {
          id: user.id,
          name: user.name,
          email: user.email,
          sales: user.sales.map((sale) => ({
            id: sale.id,
            car: sale.car.make,
            price: sale.salePrice,
            date: sale.saleDate,
          })),
          rentals: user.rentals.map((rental) => ({
            id: rental.id,
            car: rental.car.make,
            price: rental.rentalPrice,
            start: rental.rentalStartDate,
            end: rental.rentalEndDate,
          })),
        },
      },
    };
  }
}
