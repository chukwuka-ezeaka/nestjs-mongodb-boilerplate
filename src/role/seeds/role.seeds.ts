import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../role.service';
import Roles from './roles.json';
import { CreateRoleDto } from '../dto/role.dto';

@Injectable()
export class RoleSeed {
  constructor(private readonly roleService: RoleService) {}

  @Command({
    command: 'seed:roles',
    describe: 'create default roles',
    autoExit: true,
  })
  async create() {
    console.log(Roles);
    for (let role of Roles) {
      const result = await this.roleService.seedRoles(role);
      console.log(result);
    }
  }
}
