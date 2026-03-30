import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value?.password) {
      const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;

      const isValidPasword = password.test(value?.password);

      if (!isValidPasword) {
        throw new BadRequestException(
          `Password must be at least 8 characters long`,
        );
      }
      return value;
    }

    return value;
  }
}
