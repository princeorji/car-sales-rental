import { RentalStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class RentalDto {
  @IsNumber()
  @IsNotEmpty()
  carId: Number;

  @IsDate()
  @IsNotEmpty()
  rentalStartDate: Date;

  @IsDate()
  @IsNotEmpty()
  rentalEndDate: Date;

  @IsNumber()
  @IsNotEmpty()
  rentalPrice: number;

  @IsEnum(RentalStatus)
  status: RentalStatus;
}
