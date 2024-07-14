import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SaleDto {
  @IsUUID()
  @IsNotEmpty({ message: 'carId must not be null' })
  carId: string;

  @IsDate()
  @IsNotEmpty({ message: 'Sale date must not be null' })
  saleDate: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Sale price must not be null' })
  salePrice: number;
}
