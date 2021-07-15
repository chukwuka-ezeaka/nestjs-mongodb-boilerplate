import * as mongoose from 'mongoose';

export const PermissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

PermissionSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const newObject = {
    id: _id,
    ...object,
  };
  return newObject;
});
