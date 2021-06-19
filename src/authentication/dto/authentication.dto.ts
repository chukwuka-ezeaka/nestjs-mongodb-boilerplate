import { IsString, IsNumber, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString() @IsOptional() id: string;
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() @IsOptional() name: string;
  @IsString() username: string;
  @IsString() phone: string;
  @IsString() email: string;
  @IsString() password: string;
  @IsString() @IsOptional() role: string;
}

export class LoginDto {
  @IsString() username: string;
  @IsString() password: string;
}
