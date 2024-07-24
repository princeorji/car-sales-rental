import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RentalDto } from './dto/rental.dto';

@Injectable()
export class RentalService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async create( dto: RentalDto) {
    try {
      const rental = await this.prismaService.rental.create({
        data: {
          car: {
            connect: { id: dto.carId },
          },
          user: {
            connect: { id: dto.userId },
          },
          rentalStartDate: new Date(dto.rentalStartDate),
          rentalEndDate: new Date(dto.rentalEndDate),
          rentalPrice: Number(dto.rentalPrice),
        },
      });

      return rental;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const rentals = this.prismaService.rental.findMany();
    return rentals;
  }

  async findOne(id: string) {
    const rental = await this.prismaService.rental.findUnique({
      where: { id },
    });
    if (!rental) {
      throw new NotFoundException('Rental with not found');
    }
    return rental;
  }

  async update(id: string, dto: RentalDto) {
    try {
      const rental = await this.prismaService.rental.update({
        where: { id },
        data: {
          car: {
            connect: { id: dto.carId },
          },
          user: {
            connect: { id: dto.userId },
          },
          rentalStartDate: new Date(dto.rentalStartDate),
          rentalEndDate: new Date(dto.rentalEndDate),
          rentalPrice: Number(dto.rentalPrice),
        },
      });

      return rental;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    const rental = await this.prismaService.rental.findUnique({
      where: { id },
    });
    if (!rental) {
      throw new NotFoundException('Rental with not found');
    }

    return this.prismaService.rental.delete({
      where: { id },
    });
  }
}
