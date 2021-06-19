import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UserModule } from '../../user/user.module';
import { UserSeed } from '../../user/seeds/user.seeds';
import { RoleModule } from '../../role/role.module';
import { RoleSeed } from '../../role/seeds/role.seeds';

@Module({
  imports: [CommandModule, UserModule, RoleModule],
  providers: [UserSeed, RoleSeed],
  exports: [UserSeed, RoleSeed],
})
export class SeedsModule {}
