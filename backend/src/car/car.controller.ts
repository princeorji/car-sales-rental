import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/roles.deorator';
import { Role } from 'src/auth/enums/role.enum';
import { RoleGuard } from 'src/auth/guard/roles.guard';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CarDto) {
    return this.carService.create(dto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() dto: CarDto) {
    return this.carService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
