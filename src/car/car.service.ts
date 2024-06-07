import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarDto, updateCarDto } from './dto/car.dto';

@Injectable()
export class CarService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CarDto) {
    try {
      const car = await this.prismaService.car.create({
        data: {
          ...dto,
          year: Number(dto.year),
          mileage: Number(dto.mileage),
          purchasePrice: Number(dto.purchasePrice),
          rentalPricePerDay: Number(dto.rentalPricePerDay),
        },
      });
      return car;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const cars = this.prismaService.car.findMany({
      where: {
        status: 'Available',
      },
    });
    return cars;
  }

  async findOne(id: string) {
    const car = await this.prismaService.car.findUnique({
      where: { id },
    });
    if (!car || car.status !== 'Available') {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async update(id: string, dto: updateCarDto) {
    try {
      const car = await this.prismaService.car.findUnique({
        where: { id },
      });
      if (!car) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }
      return this.prismaService.car.update({
        where: { id },
        data: {
          ...dto,
          year: Number(dto.year),
          mileage: Number(dto.mileage),
          purchasePrice: Number(dto.purchasePrice),
          rentalPricePerDay: Number(dto.rentalPricePerDay),
          status: dto.status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const car = await this.prismaService.car.findUnique({
      where: { id },
    });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return this.prismaService.car.delete({
      where: { id },
    });
  }
}
