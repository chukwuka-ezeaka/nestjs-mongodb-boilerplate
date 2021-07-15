import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Res,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ExceptionsLoggerFilter } from '../shared/exceptions/exceptionLogger.filter';
import { AuthenticationService } from './authentication.service';
import { LoginDto, RegisterDto } from './dto/authentication.dto';
@ApiTags('auth')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/register')
  @UseFilters(ExceptionsLoggerFilter)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerDto: RegisterDto,
  ) {
    try {
      await this.authenticationService.register(registerDto);

      res
        .status(201)
        .send({ success: true, message: 'Registration successful' });
    } catch (e) {
      throw new HttpException(
        { success: false, message: e.message },
        e.statusCode,
      );
    }
  }

  @Post('/login')
  @UseFilters(ExceptionsLoggerFilter)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ) {
    try {
      const data = await this.authenticationService.login(loginDto);
      res
        .status(200)
        .send({ success: true, message: 'login successful', data });
    } catch (e) {
      throw new HttpException(
        { success: false, message: e.message },
        e.statusCode,
      );
    }
  }
}
