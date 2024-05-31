import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from './user.service';
import { UserRequest } from './user.types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: UserRequest) {
    return this.userService.findOne(req.user.email);
  }
}
