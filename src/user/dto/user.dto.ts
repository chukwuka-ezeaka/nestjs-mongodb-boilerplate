import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsOptional() id: string;
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() @IsOptional() name: string;
  @IsString() username: string;
  @IsString() phone: string;
  @IsString() email: string;
  @IsString() password: string;
  @IsString() role: string;
}

export class GetUserDto {
  @IsString() @IsOptional() id: string;
  @IsString() @IsOptional() username: string;
  @IsString() @IsOptional() phone: string;
  @IsString() @IsOptional() email: string;
}
