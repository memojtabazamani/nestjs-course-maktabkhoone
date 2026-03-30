import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value?.password) {
      const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;

      const isValidPasword = password.test(value?.password);

      if (!isValidPasword) {
        throw new BadRequestException(
          `Password must be at least 8 characters long`,
        );
      } else {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(value.password, salt);

        return { ...value, password: hashPassword };
      }
      return value;
    }

    return value;
  }
}
