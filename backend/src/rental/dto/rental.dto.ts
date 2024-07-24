import { IsISO8601, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class RentalDto {
  @IsUUID()
  @IsNotEmpty({ message: 'carId must not be null' })
  carId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'userId must not be null' })
  userId: string;

  @IsISO8601()
  @IsNotEmpty({ message: 'Rental start date must not be null' })
  rentalStartDate: string;

  @IsISO8601()
  @IsNotEmpty({ message: 'Rental end date must not be null' })
  rentalEndDate: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Rental price must not be null' })
  rentalPrice: number;
}
