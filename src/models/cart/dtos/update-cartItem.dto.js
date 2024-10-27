import { updateCartItemSchema } from "../../../constants/cart.constants.js";

export default class UpdateCartItemDTO {
  static from(object) {
    const validation = updateCartItemSchema.validate(object);

    if (validation.error) {
      throw new Error(Array.toString(validation.error.details));
    }

    let dto = {};

    if (object.quantity) {
      Object.defineProperty(dto, "quantity", {
        enumerable: true,
        value: object.quantity,
      });
    }

    if (object.salesPrice) {
      Object.defineProperty(dto, "salesPrice", {
        enumerable: true,
        value: object.salesPrice,
      });
    }

    return dto;
  }

  static validate(object) {
    return updateCartItemSchema.validate(object);
  }
}
