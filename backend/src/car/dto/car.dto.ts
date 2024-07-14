import { CarStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty({ message: 'Make entry must not be null' })
  make: string;

  @IsString()
  @IsNotEmpty({ message: 'Model entry must not be null' })
  model: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Year must not be null' })
  year: number;

  @IsString()
  @IsNotEmpty({ message: 'VIN must not be null' })
  vin: string;

  @IsString()
  @IsNotEmpty({ message: 'Color must not be null' })
  color: string;

  @IsString()
  @IsNotEmpty({ message: 'Mileage must not be null' })
  mileage: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Purchase price must not be null' })
  purchasePrice: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Rental price per day must not be null' })
  rentalPricePerDay: number;

  @IsEnum(CarStatus)
  status: CarStatus;
}

export class updateCarDto extends CarDto {
  @IsEnum(CarStatus)
  status: CarStatus;
}
