import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [],
  },
  { timestamps: true },
);

RoleSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const newObject = {
    id: _id,
    ...object,
  };
  return newObject;
});
