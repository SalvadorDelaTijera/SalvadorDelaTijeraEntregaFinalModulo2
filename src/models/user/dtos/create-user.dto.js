import Joi from 'joi';

export default class CreateUserDTO {
  static from(object) {
    try {
      const validation = CreateUserDTO.validate(object);

      if (!validation.error) {
        object.roles = object.roles.map((role) => role.toLowerCase());

        if (object.roles.length === 0 && !object.roles.includes("user")) {
          object.roles.push("user");
        }

        return {
          email: object.email,
          password: object.password,
          firstName: object.firstName,
          lastName: object.lastName,
          roles: object.roles,
        };
      }

      throw new Error(Array.toString(validation.error.details));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    const schema = Joi.object({
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
      roles: Joi.array().items(Joi.string().label("Role")),
    });

    return schema.validate(object);
  }
}
