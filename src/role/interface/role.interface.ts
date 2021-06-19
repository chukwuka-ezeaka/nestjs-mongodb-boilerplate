import * as mongoose from 'mongoose';

export interface Role extends mongoose.Document {
  readonly id: string;
  readonly name: string;
  readonly permissions: string;
}
