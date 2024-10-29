import Joi from "joi";

export const USER_EMAIL_MIN_LENGTH = 1;

export const USER_FIRST_NAME_MIN_LENGTH = 1;

export const USER_LAST_NAME_MIN_LENGTH = 1;

export const USER_EMAIL_MIN_DOMAIN_SEGMENTS = 2;

export const USER_ROLES = {
  USER: "USER",
  PREMIUM_USER: "PREMIUM_USER",
  ADMIN: "ADMIN",
};

export const USER_PASSWORD_SALT_ROUNDS = 10;

export const createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: USER_EMAIL_MIN_DOMAIN_SEGMENTS })
    .message("Debe proporcionar un email válido."),
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
    .min(USER_FIRST_NAME_MIN_LENGTH)
    .message(
      `Debe proporcionar el/los nombre(s) de, por lo menos, ${USER_FIRST_NAME_MIN_LENGTH} ${
        USER_FIRST_NAME_MIN_LENGTH === 1 ? "caracter" : "caracteres"
      }.`
    ),
  lastName: Joi.string()
    .required()
    .min(USER_LAST_NAME_MIN_LENGTH)
    .message(
      `Debe proporcionar el/los apellido(s) de, por lo menos, ${USER_LAST_NAME_MIN_LENGTH} ${
        USER_LAST_NAME_MIN_LENGTH === 1 ? "caracter" : "caracteres"
      }.`
    ),
  roles: Joi.array().items(
    Joi.string()
      .label("Role")
      .uppercase()
      .trim()
      .valid(Object.keys(USER_ROLES))
  ),
});

export const updateUserSchema = Joi.object({
  email: Joi.string()
    .optional()
    .email({ minDomainSegments: USER_EMAIL_MIN_DOMAIN_SEGMENTS })
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
    .min(USER_FIRST_NAME_MIN_LENGTH)
    .message(
      `Debe proporcionar el/los nombre(s) de, por lo menos, ${USER_FIRST_NAME_MIN_LENGTH} ${
        USER_FIRST_NAME_MIN_LENGTH === 1 ? "caracter" : "caracteres"
      }.`
    ),
  lastName: Joi.string()
    .optional()
    .min(USER_LAST_NAME_MIN_LENGTH)
    .message(
      `Debe proporcionar el/los apellido(s) de, por lo menos, ${USER_LAST_NAME_MIN_LENGTH} ${
        USER_LAST_NAME_MIN_LENGTH === 1 ? "caracter" : "caracteres"
      }.`
    ),
  roles: Joi.array().items(
    Joi.string()
      .label("Role")
      .uppercase()
      .valid(Object.keys(USER_ROLES))
  ),
});
