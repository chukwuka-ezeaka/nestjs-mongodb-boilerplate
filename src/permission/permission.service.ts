import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/permission.dto';
import { Permission } from './interface/permission.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission')
    private readonly permissionModel: Model<Permission>,
  ) {}

  async seedPermission(body: CreatePermissionDto): Promise<{}> {
    const permission = await this.permissionModel.updateOne(
      { name: body.name },
      body,
      { upsert: true, setDefaultsOnInsert: true, new: true },
    );
    return permission;
  }

  async getPermissions(): Promise<Permission[]> {
    const permissions = await this.permissionModel.find().exec();
    return permissions;
  }
}
