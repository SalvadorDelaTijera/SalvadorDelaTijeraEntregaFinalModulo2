import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

export const ProductSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
  thumbnails: {
    type: [String],
    required: false,
    default: [],
  },
}, {
  timestamps: true,
});

ProductSchema.plugin(MongoosePaginate);

ProductSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const Product = model('Product', ProductSchema);

export default Product;
