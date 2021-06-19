import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './interface/user.interface';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, GetUserDto } from './dto/user.dto';
import { Role } from 'src/role/interface/role.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Role') private readonly roleModel: Model<Role>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { first_name, last_name, username, phone, email, password } =
      createUserDto;
    let fname = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    let lname = last_name.charAt(0).toUpperCase() + last_name.slice(1);
    let pass = bcrypt.hashSync(password, 10);
    let name = `${first_name} ${last_name}`;
    let phoneNum = '+234' + phone.slice(1);

    const newUser = new this.userModel({
      first_name: fname,
      last_name: lname,
      name,
      username,
      phone: phoneNum,
      email,
      password: pass,
    });

    const result = await newUser.save();
    return result;
  }

  async getUserLogin(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException(
        { success: false, message: 'User not found' },
        404,
      );
    }
    return user;
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException(
        { success: false, message: 'User not found' },
        404,
      );
    }
    return user;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    if (!users) {
      throw new HttpException(
        { success: false, message: 'User not found' },
        404,
      );
    }
    return users;
  }

  async seedAdmin(createUserDto: CreateUserDto) {
    const { first_name, last_name, username, phone, email, password } =
      createUserDto;
    let pass = bcrypt.hashSync(password, 10);
    let name = `${first_name} ${last_name}`;
    const admin = await this.userModel.updateOne(
      { email: email },
      {
        first_name,
        last_name,
        name,
        username,
        phone,
        password: pass,
      },
      { upsert: true, setDefaultsOnInsert: true, new: true },
      function (error, doc) {
        if (error) {
          console.log(error);
        }
      },
    );
    return admin;
  }
}
