import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SaleDto {
  @IsUUID()
  @IsNotEmpty()
  carId: Number;

  @IsDate()
  @IsNotEmpty()
  saleDate: Date;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;
}
