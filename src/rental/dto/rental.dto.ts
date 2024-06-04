import { RentalStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class RentalDto {
  @IsUUID()
  @IsNotEmpty()
  carId: String;

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
