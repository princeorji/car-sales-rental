import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleDto } from './dto/sale.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Request() req, @Body() dto: SaleDto) {
    return this.saleService.create(req.user.email, dto);
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: SaleDto, @Request() req) {
    return this.saleService.update(id, req.user.email, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(id);
  }
}
