import { hash } from 'bcrypt';
import { createUserSchema, USER_PASSWORD_SALT_ROUNDS } from '../../../constants/user.constants.js';

export default class CreateUserDTO {
  static async from(object) {
    try {
      const validation = createUserSchema.validate(object);

      if (validation.error) {
        throw new Error(Array.toString(validation.error.details));
      }

      const password = await hash(object.password, USER_PASSWORD_SALT_ROUNDS);

      const roles = object.roles.map((role) => role.toLowerCase());

      if (roles.length === 0 && !roles.includes("user")) {
        roles.push("user");
      }

      return {
        email: object.email,
        password,
        firstName: object.firstName,
        lastName: object.lastName,
        roles,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static validate(object) {
    return createUserSchema.validate(object);
  }
}
