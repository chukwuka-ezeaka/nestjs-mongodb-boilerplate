import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import Permissions from './permissions.json';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionSeed {
  constructor(private readonly permissionService: PermissionService) {}

  @Command({
    command: 'seed:permissions',
    describe: 'seed permissions',
    autoExit: true,
  })
  async create() {
    for (let permission of Permissions) {
      const perm = await this.permissionService.seedPermission(permission);
      console.log(perm);
    }
  }
}
