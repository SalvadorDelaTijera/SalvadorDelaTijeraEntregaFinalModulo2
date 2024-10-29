import { hash } from 'bcrypt';
import {
  createUserSchema,
  USER_PASSWORD_SALT_ROUNDS,
  USER_ROLES,
} from '../../../constants/user.constants.js';

export default class CreateUserDTO {
  static async from(object) {
    try {
      const validation = createUserSchema.validate(object);

      if (validation.error) {
        throw new Error(Array.toString(validation.error.details));
      }

      const password = await hash(object.password, USER_PASSWORD_SALT_ROUNDS);

      const roles = object.roles.map((role) => USER_ROLES[role.toUpperCase()]);

      if (roles.length === 0 && !roles.includes(USER_ROLES.USER)) {
        roles.push(USER_ROLES.USER);
      }

      return {
        email: object.email.trim(),
        password,
        firstName: object.firstName.trim(),
        lastName: object.lastName.trim(),
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
