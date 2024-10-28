import { createProductSchema } from "../../../constants/product.constants.js";

export default class CreateProductDTO {
  static from(object) {
    try {
      const validation = createProductSchema.validate(object);

      if (validation.error) {
        throw new Error(Array.toString(validation.error.details));
      }

      const code = object.code.toUpperCase();

      return {
        code,
        title: object.title,
        description: object.description ?? '',
        price: object.price,
        stock: object.stock,
        status: object.status,
        thumbnails: object.thumbnails,
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    return createProductSchema.validate(object);
  }
}
