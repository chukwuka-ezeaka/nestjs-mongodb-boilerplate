import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly name: string;
  readonly username: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
}
