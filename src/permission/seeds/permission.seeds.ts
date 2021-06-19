import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import Admin from './user.admin.json';
import { PermissionService } from '../permission.service';

@Injectable()
export class UserSeed {
  constructor(private readonly permissionService: PermissionService) {}

  @Command({
    command: 'create:admin',
    describe: 'create a user',
    autoExit: true,
  })
  async create() {
    // const user = await this.permissionService.seedAdmin(Admin);
    // console.log(user);
  }
}
