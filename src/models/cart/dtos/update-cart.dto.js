import { updateCartSchema } from "../../../constants/cart.constants.js";

export default class UpdateCartDTO {
  static from(object) {
    const validation = updateCartSchema.validate(object);

    if (validation.error) {
      throw new Error(Array.toString(validation.error.details));
    }

    return {
      items: [ ...object.items ],
    }
  }

  static validate(object) {
    return updateCartSchema.validate(object);
  }
}
