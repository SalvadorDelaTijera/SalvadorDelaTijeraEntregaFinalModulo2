import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
  },
  roles: {
    type: [String],
    required: true,
    default: ['user'],
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
