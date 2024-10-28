import Joi from "joi";

export const FIRST_NAME_MIN_LENGTH = 1;

export const LAST_NAME_MIN_LENGTH = 1;

export const USER_ROLES = {
  USER: "USER",
  PREMIUM_USER: "PREMIUM USER",
  ADMIN: "ADMIN",
};

export const USER_PASSWORD_SALT_ROUNDS = 10;

export const createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .message("Debe proporcionar un email."),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[a-zA-ZñÑ])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~])[A-Za-zñÑ\d!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]{6,}$/
    )
    .message(
      "Debe proporcionar una contraseña de, por lo menos, 6 caracteres y debe contener por lo menos una letra, un número y un símbolo."
    ),
  firstName: Joi.string()
    .required()
    .min(1)
    .message(
      "Debe proporcionar el/los nombre(s) de, por lo menos, 1 caracter."
    ),
  lastName: Joi.string()
    .required()
    .min(1)
    .message(
      "Debe proporcionar el/los apellido(s) de, por lo menos, 1 caracter."
    ),
  roles: Joi.array().items(Joi.string().label("Role").valid(...USER_ROLES)),
});

export const updateUserSchema = Joi.object({
  email: Joi.string()
    .optional()
    .email({ minDomainSegments: 2 })
    .message("Debe proporcionar un email válido."),
  password: Joi.string()
    .optional()
    .pattern(
      /^(?=.*[a-zA-ZñÑ])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~])[A-Za-zñÑ\d!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]{6,}$/
    )
    .message(
      "La contraseña debe contener, por lo menos, 6 caracteres (por lo menos una letra, un número y un símbolo)."
    ),
  firstName: Joi.string()
    .optional()
    .min(1)
    .message(
      "Debe proporcionar el/los nombre(s) de, por lo menos, 1 caracter."
    ),
  lastName: Joi.string()
    .optional()
    .min(1)
    .message(
      "Debe proporcionar el/los apellido(s) de, por lo menos, 1 caracter."
    ),
  roles: Joi.array().items(Joi.string().label("Role").valid(...USER_ROLES)),
});
