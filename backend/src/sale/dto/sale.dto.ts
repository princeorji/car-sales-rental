import { IsISO8601, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SaleDto {
  @IsUUID()
  @IsNotEmpty({ message: 'carId must not be null' })
  carId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'userId must not be null' })
  userId: string;

  @IsISO8601()
  @IsNotEmpty({ message: 'Sale date must not be null' })
  saleDate: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Sale price must not be null' })
  salePrice: number;
}
