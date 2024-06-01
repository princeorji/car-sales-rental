import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentalDto } from './dto/rental.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RentalService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async create(email: string, dto: RentalDto) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new ForbiddenException('User not found or unauthorized');
    }

    try {
      const rental = await this.prismaService.rental.create({
        data: {
          user: {
            connect: { email: user.email },
          },
          car: {
            connect: { id: Number(dto.carId) },
          },
          rentalStartDate: new Date(dto.rentalStartDate),
          rentalEndDate: new Date(dto.rentalEndDate),
          rentalPrice: Number(dto.rentalPrice),
          status: dto.status,
        },
      });
      return rental;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const rentals = this.prismaService.rental.findMany();
    return rentals;
  }

  async findOne(id: number) {
    const rental = await this.prismaService.rental.findUnique({
      where: { id },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async update(id: number, email: string, dto: RentalDto) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new ForbiddenException('User not found or unauthorized');
    }

    try {
      return await this.prismaService.rental.update({
        where: { id },
        data: {
          car: {
            connect: { id: Number(dto.carId) },
          },
          rentalStartDate: new Date(dto.rentalStartDate),
          rentalEndDate: new Date(dto.rentalEndDate),
          rentalPrice: Number(dto.rentalPrice),
          status: dto.status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const rental = await this.prismaService.rental.findUnique({
      where: { id },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return this.prismaService.rental.delete({
      where: { id },
    });
  }
}
