import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler = (statusCode: number, message: string): Error => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = new Error() as any;
  error.statusCode = statusCode;
  error.message = message;

  return error;
};

export const errorRequestHandler: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _request: Request,
  response: Response
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  response.status(statusCode).json({
    statusCode,
    ok: false,
    message,
  });
};

export const logError = // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any, _request: Request, _response: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'production') {
      // TODO log the error to the database;
    } else {
      console.error(error);
    }

    next(error);
  };

export const handle404Error = // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any, _request: Request, response: Response, next: NextFunction) => {
    if (error.status === 404) {
      response.status(404).json({ message: 'Page Not Found' });
      return;
    }

    next(error);
  };

export const handleRemainingErrors = // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  (error: any, _request: Request, response: Response) => {
    const message = error.message || 'Internal Server Error';
    response.status(error.statusCode || 500).json({ message });
  };
