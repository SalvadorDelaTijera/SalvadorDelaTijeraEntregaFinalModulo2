import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";
import {
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_TITLE_MIN_LENGTH,
  PRODUCT_MIN_PRICE,
  PRODUCT_DEFAULT_PRICE,
  PRODUCT_MIN_STOCK,
  PRODUCT_DEFAULT_STOCK,
} from "../../constants/product.constants.js";

export const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      minLength: PRODUCT_CODE_MIN_LENGTH,
    },
    title: {
      type: String,
      required: true,
      minLength: PRODUCT_TITLE_MIN_LENGTH,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: PRODUCT_MIN_PRICE,
      default: PRODUCT_DEFAULT_PRICE,
    },
    stock: {
      type: Number,
      required: true,
      min: PRODUCT_MIN_STOCK,
      default: PRODUCT_DEFAULT_STOCK,
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
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(MongoosePaginate);

ProductSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const Product = model('Product', ProductSchema);

export default Product;
