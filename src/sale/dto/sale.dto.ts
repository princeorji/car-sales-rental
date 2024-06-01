import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class SaleDto {
  @IsNumber()
  @IsNotEmpty()
  carId: Number;

  @IsDate()
  @IsNotEmpty()
  saleDate: Date;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;
}
