import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  },
  { timestamps: true },
);

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const newObject = {
    id: _id,
    ...object,
  };
  return newObject;
});
