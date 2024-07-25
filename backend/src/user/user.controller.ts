import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from './user.service';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.deorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  profile(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
