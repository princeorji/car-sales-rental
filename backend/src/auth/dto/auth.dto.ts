import { Role } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email must be unique and must not be null' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must not be null' })
  @MinLength(6)
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  @IsNotEmpty({ message: 'Name must not be null' })
  name: string;

  @IsEnum(Role)
  userType: Role;
}
