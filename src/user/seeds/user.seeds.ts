import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import Admin from './admin.json';

@Injectable()
export class UserSeed {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'seed:admin',
    describe: 'create super admin',
    autoExit: true,
  })
  async create() {
    console.log('hereeeee');
    console.log(Admin);
    // const user = await this.userService.seedAdmin(Admin);
    // console.log(user);
  }
}
