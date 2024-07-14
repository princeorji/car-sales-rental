import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class RentalDto {
  @IsUUID()
  @IsNotEmpty({ message: 'carId must not be null' })
  carId: string;

  @IsDate()
  @IsNotEmpty({ message: 'Rental start date must not be null' })
  rentalStartDate: Date;

  @IsDate()
  @IsNotEmpty({ message: 'Rental end date must not be null' })
  rentalEndDate: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Rental price must not be null' })
  rentalPrice: number;
}
