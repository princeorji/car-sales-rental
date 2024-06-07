import { CarStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  mileage: string;

  @IsNumber()
  @IsNotEmpty()
  purchasePrice: number;

  @IsNumber()
  @IsNotEmpty()
  rentalPricePerDay: number;

  @IsEnum(CarStatus)
  status: CarStatus;
}

export class updateCarDto extends CarDto {
  @IsEnum(CarStatus)
  status: CarStatus;
}
