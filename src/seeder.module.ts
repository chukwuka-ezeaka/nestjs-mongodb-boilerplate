import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UserModule } from './user/user.module';
import { UserSeed } from './user/seeds/user.seeds';
import { RoleModule } from './role/role.module';
import { RoleSeed } from './role/seeds/role.seeds';
import { PermissionModule } from './permission/permission.module';
import { PermissionSeed } from './permission/seeds/permission.seeds';

@Module({
  imports: [CommandModule, UserModule, RoleModule, PermissionModule],
  providers: [UserSeed, RoleSeed, PermissionSeed],
  exports: [UserSeed, RoleSeed, PermissionSeed],
})
export class SeederModule {}
