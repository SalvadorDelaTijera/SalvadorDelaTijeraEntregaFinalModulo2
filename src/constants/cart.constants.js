import Joi from 'joi';

export const MIN_CART_ITEM_QUANTITY = 0.01;

export const MIN_CART_ITEM_PRICE = 0.01;

export const DEFAULT_CART_ITEM_QUANTITY = 1.00;

export const createCartItemSchema = Joi.object({
  product: Joi.string()
    .required()
    .alphanum()
    .message("Debe proporcionar el ID del producto."),
  quantity: Joi.number()
    .required()
    .precision(2)
    .positive()
    .message("Debe proporcionar un número positivo para la cantidad."),
  salesPrice: Joi.number()
    .required()
    .precision(2)
    .positive()
    .message("Debe proporcionar un número positivo para el precio de venta."),
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number()
    .optional()
    .precision(2)
    .positive()
    .message("La cantidad debe ser un número positivo."),
  salesPrice: Joi.number()
    .optional()
    .precision(2)
    .positive()
    .message("El precio de venta debe ser un número positivo."),
});

export const createCartSchema = Joi.object({
  user: Joi.string()
    .required()
    .alphanum()
    .message("Debe proporcionar el ID del usuario al que pertenece el Carrito."),
  items: Joi.array()
    .items(createCartItemSchema)
    .default([]),
});

export const updateCartSchema = Joi.object({
  items: Joi.array()
    .items(createCartItemSchema)
    .required()
    .default([])
    .message("Debe proporcionar los ítems del carrito para modificarlo."),
});
