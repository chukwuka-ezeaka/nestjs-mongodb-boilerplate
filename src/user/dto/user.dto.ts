import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty() @IsString() first_name: string;
  @ApiProperty() @IsString() last_name: string;
  @ApiProperty() @IsString() username: string;
  @ApiProperty() @IsString() phone: string;
  @ApiProperty() @IsString() email: string;
  @ApiProperty() @IsString() password: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() role?: string;
}

export class GetUserDto {
  @ApiProperty() @IsString() @IsOptional() username: string;
  @ApiProperty() @IsString() @IsOptional() phone: string;
  @ApiProperty() @IsString() @IsOptional() email: string;
}
