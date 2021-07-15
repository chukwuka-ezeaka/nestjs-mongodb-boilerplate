import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto, SeedRoleDto } from './dto/role.dto';
import { Role } from './interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;

    const newRole = new this.roleModel({ name });

    const result = await newRole.save();
    return result;
  }

  async getRole(id: string) {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new HttpException(
        { success: false, message: 'Role not found' },
        404,
      );
    }
    return role;
  }

  async getRoles() {
    const roles = await this.roleModel.find().exec();
    if (!roles) {
      throw new HttpException(
        { success: false, message: 'Roles not found' },
        404,
      );
    }
    return roles;
  }

  async seedRoles(seedRoleDto: SeedRoleDto) {
    const { name } = seedRoleDto;
    const role = await this.roleModel.updateOne(
      { name },
      {
        name,
      },
      { upsert: true, new: true },
      function (error, doc) {
        if (error) {
          console.log(error);
        }
      },
    );
    return role;
  }
}
