import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

interface _Error extends Error {
  message: string;
  statusCode: number;
}

export const errorHandler = (statusCode: number, message: string): Error => {
  const error = new Error() as _Error;
  error.statusCode = statusCode;
  error.message = message;

  return error;
};

export const errorRequestHandler: ErrorRequestHandler = (
  error: _Error,
  _request: Request,
  response: Response
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

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

export const unhandledRequestCatcher = (
  _request: Request,
  _response: Response,
  next: NextFunction
) => {
  const error = new Error('Page Not Found') as _Error;
  error.statusCode = 404;
  next(error);
};

export const handle404Error = (
  error: _Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.statusCode === 404) {
    response.status(404).json({ message: 'Page Not Found' });
    return;
  }

  next(error);
};

export const handleRemainingErrors = (
  error: _Error,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const statusCode = error.statusCode ? error.statusCode : 500;
  const message = error.message ? error.message : 'Internal Server Error';
  response.status(statusCode).json({ message });
};

export const queryResultErrorCode = {
  noData: 0,
};
