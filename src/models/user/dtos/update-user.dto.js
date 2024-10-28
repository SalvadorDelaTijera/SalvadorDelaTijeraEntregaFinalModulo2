import { hash } from 'bcrypt';
import { updateUserSchema, USER_PASSWORD_SALT_ROUNDS } from '../../../constants/user.constants.js';

export default class UpdateUserDTO {
  static async from(object) {
    try {
      const validation = updateUserSchema.validate(object);

      if (!validation.error) {
        let dto = {};

        if (object.email) {
          Object.defineProperty(dto, "email", {
            enumerable: true,
            value: object.email
          });
        }

        if (object.password) {
          Object.defineProperty(dto, "password", {
            enumerable: true,
            value: await hash(object.password, USER_PASSWORD_SALT_ROUNDS),
          });
        }

        if (object.firstName) {
          Object.defineProperty(dto, "firstName", {
            enumerable: true,
            value: object.firstName
          });
        }

        if (object.lastName) {
          Object.defineProperty(dto, "lastName", {
            enumerable: true,
            value: object.lastName
          });
        }

        if (object.roles && object.roles.length > 0) {
          const roles = object.roles.map((role) => role.toLowerCase());
          Object.defineProperty(dto, "roles", {
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
    return updateUserSchema.validate(object);
  }
}