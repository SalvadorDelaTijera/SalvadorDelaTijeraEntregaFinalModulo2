import Joi from 'joi';

export default class UpdateProductDTO {
  static from(object) {
    try {
      const validation = UpdateProductDTO.validate(object);

      if (!validation.error) {
        let dto = {};

        if (object.code) {
          Object.defineProperty(dto, "code", {
            enumerable: true,
            value: object.code
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
      }

      throw new Error(Array.toString(validation.error.details));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    const schema = Joi.object({
      code: Joi.string()
        .optional()
        .min(1)
        .alphanum()
        .message("El código del producto sólo puede contener caracteres alfanuméricos."),
      title: Joi.string()
        .optional()
        .min(1)
        .message("El título del producto debe contener por lo menos un caracter."),
      description: Joi.string()
        .optional()
        .min(1)
        .message(
          "La descripción del producto debe contener una letra por lo menos."
        ),
      price: Joi.number()
        .optional()
        .positive()
        .precision(2)
        .message("El precio del producto debe ser mayor que 0.00."),
      stock: Joi.number()
        .optional()
        .min(0)
        .precision(2)
        .message(
          "El stock del producto debe ser mayor o igual que 0."
        ),
      status: Joi.boolean().optional(),
      thumbnails: Joi.array(Joi.string().uri()).optional(),
    });

    return schema.validate(object);
  }
}
