import { Get, Req, Res, Param, HttpException } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { PermissionService } from './permission.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permission')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getPermissions(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const permissions = await this.permissionService.getPermissions();
      if (!permissions) {
        throw new HttpException(
          { success: false, message: 'No Permissions found' },
          404,
        );
      }
      res.status(200).send({ success: true, data: permissions });
    } catch (e) {
      throw new HttpException({ success: false, message: e.message }, e.status);
    }
  }
}
