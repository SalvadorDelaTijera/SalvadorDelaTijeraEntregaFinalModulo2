import { createCartSchema } from "../../../constants/cart.constants.js";

export default class CreateCartDTO {
  static from(object) {
    try {
      const validation = CreateCartDTO.validate(object);

      if (!validation.error) {
        let dto = {
          user: object.user,
        };

        if (object.items && object.items.length > 0) {
          Object.defineProperty(dto, "items", {
            enumerable: true,
            value: [ ...object.items ],
          });
        }

        return dto;
      }

      throw new Error(Array.toString(validation.error.details));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    return createCartSchema.validate(object);
  }
}
