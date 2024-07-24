import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalDto } from './dto/rental.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: RentalDto) {
    return this.rentalService.create(dto);
  }

  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: RentalDto) {
    return this.rentalService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(id);
  }
}
