import {
  ErrorRequestHandler,
  /* NextFunction, */ Request,
  Response,
} from 'express';

export const errorHandler = (statusCode: number, message: string): Error => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = new Error() as any;

  return { ...error, statusCode, message };
};

export const errorRequestHandler: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _request: Request,
  response: Response
  // _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  response.status(statusCode).json({
    statusCode,
    ok: false,
    message,
  });
};
