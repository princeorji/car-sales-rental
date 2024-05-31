import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    return users;
  }

  async findOne(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },

        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          address: true,
          sales: {
            select: {
              carId: true,
            },
          },
          rentals: {
            select: {
              carId: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
