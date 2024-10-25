import Joi from "joi";

export default class UpdateUserDTO {
  static from(object) {
    try {
      const validation = UpdateUserDTO.validate(object);

      if (!validation.error) {
        let dto = {};

        if (object.email) {
          Object.defineProperty(dto, "email", {
            writable: false,
            enumerable: true,
            value: object.email
          });
        }

        if (object.password) {
          Object.defineProperty(dto, "password", {
            writable: false,
            enumerable: true,
            value: object.password,
          });
        }

        if (object.firstName) {
          Object.defineProperty(dto, "firstName", {
            writable: false,
            enumerable: true,
            value: object.firstName
          });
        }

        if (object.lastName) {
          Object.defineProperty(dto, "lastName", {
            writable: false,
            enumerable: true,
            value: object.lastName
          });
        }

        if (object.roles && object.roles.length > 0) {
          const roles = object.roles.map((role) => role.toLowerCase());
          Object.defineProperty(dto, "roles", {
            writable: false,
            enumerable: true,
            value: roles,
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
      roles: Joi.array().items(Joi.string().label("Role")),
    });

    return schema.validate(object);
  }
}