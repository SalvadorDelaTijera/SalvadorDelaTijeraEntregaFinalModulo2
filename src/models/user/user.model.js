import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ['USER'],
  },
}, {
  timestamps: true,
});

UserSchema.plugin(MongoosePaginate);

UserSchema.plugin(MongooseDelete, {
  indexFields: ['deleted', 'deletedAt'],
  overrideMethods: 'all'
});

const User = model('User', UserSchema);

export default User;
