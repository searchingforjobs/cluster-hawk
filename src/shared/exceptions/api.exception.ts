import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

export class ApiException {
  static NotImplemented(messages?: string | [string]) {
    return new HttpException(
      messages ? messages : 'Not implemented',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  static BadRequest(messages?: string | [string]) {
    return new HttpException(
      messages ? messages : 'Bad request',
      HttpStatus.BAD_REQUEST,
    );
  }

  static Forbidden(messages?: string | [string]) {
    return new HttpException(
      messages ? messages : 'Forbidden',
      HttpStatus.FORBIDDEN,
    );
  }

  static NotFound(messages?: string | [string]) {
    return new HttpException(
      messages ? messages : 'Not found',
      HttpStatus.NOT_FOUND,
    );
  }

  static InternalServerError(messages?: string | [string]) {
    return new HttpException(
      messages ? messages : 'Oops, something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static Unauthorized(messages?: string | [string]) {
    return new UnauthorizedException(
      messages ? messages : 'Incorrect credentials',
    );
  }
}
