import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

export const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  salesPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
},{
  timestamps: true,
  _id: false,
  virtuals: {
    subtotal: {
      get() {
        return this.salesPrice * this.quantity;
      },
    },
  },
  toObject: {
    getters: true,
    virtuals: true,
  }
});

export const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [CartItemSchema],
}, {
  timestamps: true,
  virtuals: {
    total: {
      get() {
        return this.items.reduce((total, item) => total += item.salesPrice * item.quantity, 0);
      },
    },
  },
  toObject: {
    getters: true,
    virtuals: true,
  }
});

CartSchema.plugin(MongoosePaginate);

CartSchema.plugin(MongooseDelete, {
  indexFields: ["deleted", "deletedAt"],
  overrideMethods: "all",
});

const Cart = model('Cart', CartSchema);

export default Cart;
