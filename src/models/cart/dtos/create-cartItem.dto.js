import { createCartItemSchema } from "../../../constants/cart.constants.js";

export default class CreateCartItemDTO {
  static from(object) {
    const validation = createCartItemSchema.validate(object);

    if (validation.error) {
      throw new Error(Array.toString(validation.error.details));
    }

    return {
      usuario: object.usuario,
      quantity: object.quantity,
      salesPrice: object.salesPrice,
    };
  }

  static validate(object) {
    return createCartItemSchema.validate(object);
  }
}
