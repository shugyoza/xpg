import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export function errorHandler(statusCode: number, message: string): Error {
  const error = new Error() as any;

  return { ...error, statusCode, message };
}

export const errorRequestHandler: ErrorRequestHandler = (
  err: any,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  response.status(statusCode).json({
    statusCode,
    ok: false,
    message,
  });
};
