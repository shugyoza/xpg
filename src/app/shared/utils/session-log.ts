import { NextFunction, Request, Response } from 'express';
import { PassportStatic } from 'passport';

declare module 'express-session' {
  export interface SessionData {
    passport: PassportStatic;
  }
}

let count = 1;

export const sessionLog = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const { body, session, user } = request;
  console.log({ counter: count++, body, session, user });

  next();
};
