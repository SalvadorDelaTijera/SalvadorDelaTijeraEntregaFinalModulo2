import Joi from 'joi';

export const PRODUCT_CODE_MIN_LENGTH = 1;

export const PRODUCT_TITLE_MIN_LENGTH = 1;

export const PRODUCT_DESCRIPTION_MIN_LENGTH = 1;

export const PRODUCT_PRICE_PRECISION = 2;

export const PRODUCT_MIN_PRICE = 0;

export const PRODUCT_DEFAULT_PRICE = 0;

export const PRODUCT_STOCK_PRECISION = 2;

export const PRODUCT_MIN_STOCK = 0;

export const PRODUCT_DEFAULT_STOCK = 0;

export const createProductSchema = Joi.object({
  code: Joi.string()
    .required()
    .min(PRODUCT_CODE_MIN_LENGTH)
    .alphanum()
    .message("Debe proporcionar un código alfanumérico para el producto."),
  title: Joi.string()
    .required()
    .min(PRODUCT_TITLE_MIN_LENGTH)
    .message("Debe proporcionar un título para el producto."),
  description: Joi.string()
    .optional()
    .min(PRODUCT_DESCRIPTION_MIN_LENGTH)
    .message(
      "La descripción del producto debe contener una letra por lo menos."
    ),
  price: Joi.number()
    .required()
    .min(PRODUCT_MIN_PRICE)
    .precision(PRODUCT_PRICE_PRECISION)
    .message("Debe proporcionar el precio del producto (mayor que 0.00)."),
  stock: Joi.number()
    .required()
    .min(PRODUCT_MIN_STOCK)
    .precision(PRODUCT_STOCK_PRECISION)
    .message(
      "Debe proporcionar el stock actual del producto (mayor o igual que 0)."
    ),
  status: Joi.boolean().required().default(true),
  thumbnails: Joi.array(Joi.string().uri()).required().default([]),
});

export const updateProductSchema = Joi.object({
  code: Joi.string()
    .optional()
    .min(PRODUCT_CODE_MIN_LENGTH)
    .alphanum()
    .message(
      "El código del producto sólo puede contener caracteres alfanuméricos."
    ),
  title: Joi.string()
    .optional()
    .min(PRODUCT_TITLE_MIN_LENGTH)
    .message("El título del producto debe contener por lo menos un caracter."),
  description: Joi.string()
    .optional()
    .min(PRODUCT_DESCRIPTION_MIN_LENGTH)
    .message(
      "La descripción del producto debe contener una letra por lo menos."
    ),
  price: Joi.number()
    .optional()
    .min(PRODUCT_MIN_PRICE)
    .precision(PRODUCT_PRICE_PRECISION)
    .message("El precio del producto debe ser mayor que 0.00."),
  stock: Joi.number()
    .optional()
    .min(PRODUCT_MIN_STOCK)
    .precision(PRODUCT_STOCK_PRECISION)
    .message("El stock del producto debe ser mayor o igual que 0."),
  status: Joi.boolean().optional(),
  thumbnails: Joi.array(Joi.string().uri()).optional(),
});
