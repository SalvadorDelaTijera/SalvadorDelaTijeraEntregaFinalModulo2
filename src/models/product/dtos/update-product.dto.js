import { updateProductSchema } from "../../../constants/product.constants.js";

export default class UpdateProductDTO {
  static from(object) {
    try {
      const validation = updateProductSchema.validate(object);

      if (validation.error) {
        throw new Error(Array.toString(validation.error.details));
      }
      
      let dto = {};

      if (object.code) {
        Object.defineProperty(dto, "code", {
          enumerable: true,
          value: object.code.toUpperCase(),
        });
      }

      if (object.title) {
        Object.defineProperty(dto, "title", {
          enumerable: true,
          value: object.title,
        });
      }

      if (object.description) {
        Object.defineProperty(dto, "description", {
          enumerable: true,
          value: object.description,
        });
      }

      if (object.price) {
        Object.defineProperty(dto, "price", {
          enumerable: true,
          value: object.price,
        });
      }

      if (object.stock) {
        Object.defineProperty(dto, "stock", {
          enumerable: true,
          value: object.stock,
        });
      }

      if (Object.hasOwn(object, "status")) {
        Object.defineProperty(dto, "status", {
          enumerable: true,
          value: object.status,
        });
      }

      if (object.thumbnails && object.thumbnails.length > 0) {
        Object.defineProperty(dto, "thumbnails", {
          enumerable: true,
          value: [ ...object.thumbnails ],
        });
      }

      return dto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    return updateProductSchema.validate(object);
  }
}
