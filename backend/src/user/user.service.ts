import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },

        include: {
          sales: true,
          rentals: true,
        },
      });

      return {
        data: {
          select: {
            id: user.id,
            name: user.name,
            email: user.email,
            sales: user.sales.map((sales) => ({
              id: sales.id,
              car: sales.carId,
              price: sales.salePrice,
              date: sales.saleDate,
            })),
          },
          rentals: user.rentals.map((rentals) => ({
            id: rentals.id,
            car: rentals.carId,
            price: rentals.rentalPrice,
            start: rentals.rentalStartDate,
            end: rentals.rentalEndDate,
          })),
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
