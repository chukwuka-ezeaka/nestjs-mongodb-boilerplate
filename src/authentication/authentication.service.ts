import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/authentication.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
    return await this.userService.createUser(registerDto);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.getUserLogin(username);

    let passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new HttpException(
        { success: false, message: 'Invalid password' },
        401,
      );
    }

    let expire = 2592000;
    let token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.SECRET,
      { expiresIn: expire },
    );

    const data = {
      user,
      authorization: {
        token,
        expiresIn: expire,
      },
    };
    return data;
  }
}
