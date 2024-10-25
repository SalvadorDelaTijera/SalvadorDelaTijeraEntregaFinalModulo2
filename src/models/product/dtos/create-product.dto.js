import Joi from 'joi';

export default class CreateProductDTO {
  static from(object) {
    try {
      const validation = CreateProductDTO.validate(object);

      if (!validation.error) {
        const code = object.code.toUpperCase();

        return {
          code: code,
          title: object.title,
          description: object.description ?? '',
          price: object.price,
          stock: object.stock,
          status: object.status,
          thumbnails: object.thumbnails,
        }
      }

      throw new Error(Array.toString(validation.error.details));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    const schema = Joi.object({
      code: Joi.string()
        .required()
        .min(1)
        .alphanum()
        .message("Debe proporcionar un código alfanumérico para el producto."),
      title: Joi.string()
        .required()
        .min(1)
        .message("Debe proporcionar un título para el producto."),
      description: Joi.string()
        .optional()
        .min(1)
        .message("La descripción del producto debe contener una letra por lo menos."),
      price: Joi.number()
        .required()
        .positive()
        .precision(2)
        .message("Debe proporcionar el precio del producto (mayor que 0.00)."),
      stock: Joi.number()
        .required()
        .min(0)
        .precision(2)
        .message("Debe proporcionar el stock actual del producto (mayor o igual que 0)."),
      status: Joi.boolean()
        .required()
        .default(true),
      thumbnails: Joi.array(Joi.string().uri())
        .required()
        .default([]),
    });

    return schema.validate(object);
  }
}
