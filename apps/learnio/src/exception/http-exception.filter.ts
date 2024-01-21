import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const error = exception.getResponse();

    if (error['message'] && !Array.isArray(error['message'])) {
      error['message'] = [error['message']];
    }

    res
      .status(status)
      .render('partials/error', { error })
  }
}