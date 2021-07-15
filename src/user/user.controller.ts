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
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../shared/decorators/permissions.decorator';
import { PermissionsGuard } from '../shared/guards/permissions.guard';
import { GetUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param() getUserDto: GetUserDto,
  ) {
    try {
      res.status(200).send({ success: true, data: req.user });
    } catch (e) {
      throw new HttpException({ success: false, message: e.message }, e.status);
    }
  }
}
