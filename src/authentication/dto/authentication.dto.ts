import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty() @IsString() first_name: string;
  @ApiProperty() @IsString() last_name: string;
  @ApiProperty() @IsString() username: string;
  @ApiProperty() @IsString() phone: string;
  @ApiProperty() @IsString() email: string;
  @ApiProperty() @IsString() password: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() role?: string;
}

export class LoginDto {
  @ApiProperty() @IsString() username: string;
  @ApiProperty() @IsString() password: string;
}
