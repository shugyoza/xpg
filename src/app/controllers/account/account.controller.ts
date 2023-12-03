import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import accountModel from '../../db/account.model';
import { db } from '../../../main';
import { errorHandler } from '../../shared/utils/error';
import { tableName } from './account.constant';
import { errorMessages } from '../constants';

export const logout = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.logout((error: Error) => {
    if (error) {
      return next(error);
    }

    response.redirect('/login');
  });
};

export const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const inputErrors = validationResult(request);
  if (inputErrors) {
    response.status(400).json(inputErrors);
    return;
  }

  // auto-create username initial value based on email address
  const regex = /[@.]/gi; // remove
  const username = request.body.email.replace(regex, '-'); // remove
  // auto create default initial value for role
  const role = 'user';

  const query = {
    text:
      'INSERT INTO "' +
      tableName +
      '" (email, username, role, password) VALUES($1, $2, $3, $4) RETURNING *;',
    values: [request.body.email, username, role],
  };

  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    query.values = [...query.values, hashedPassword];

    // a successful registration will get a response of the generated account id
    const result = await db.one(query);

    response.status(201).json({
      id: result.id,
      email: request.body.email,
      username,
      createdAt: result.createdAt,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // if error due to email exists in database, return response
    if (error.code === '23505') {
      response.status(409).json(error);
    } else {
      // else just pass it to the error handler
      next(error);
    }
  }
};

interface ExpressValidatorError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const evaluateLoginErrors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const validation = validationResult(request);

  const emailPatternError = validation['errors'].filter(
    (error: ExpressValidatorError) =>
      error.path === 'login' && error.msg === errorMessages.email.pattern
  ).length;
  const usernamePatternError = validation['errors'].filter(
    (error: ExpressValidatorError) =>
      error.path === 'login' && error.msg === errorMessages.username.pattern
  ).length;

  const emailLengthError = validation['errors'].filter(
    (error: ExpressValidatorError) =>
      error.path === 'login' && error.msg === errorMessages.email.isLength
  ).length;
  const usernameLengthError = validation['errors'].filter(
    (error: ExpressValidatorError) =>
      error.path === 'login' && error.msg === errorMessages.username.isLength
  ).length;

  // if not username pattern nor email pattern, nor does not meet both's valid length, return 400
  if (
    (emailPatternError && usernamePatternError) ||
    (emailLengthError && usernameLengthError)
  ) {
    response.status(400).json(validation);
    return;
  }

  next();
};

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // if passport.authenticate has authenticate account by passing it as request.user, return ok response;
  if (request.user) {
    response.status(200).json(request.user);
    return;
  }

  // else if login did not went through passport.authenticate
  try {
    const account = await db.one(
      'SELECT * FROM "' + tableName + '" WHERE email = $1 OR username = $2;',
      [request.body.login, request.body.login]
    );

    if (!account) {
      next(errorHandler(404, 'Invalid login credentials'));
    }

    const validated = await bcrypt.compare(
      request.body.password,
      account.password
    );

    if (!validated) {
      next(errorHandler(401, 'Invalid login credentials..'));
    }

    response.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export const findAccount = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { login } = request.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;

  if (!login) {
    next(errorHandler(400, 'Missing parameter(s)'));
    return;
  }
  try {
    if (login.indexOf('@') > -1) {
      result = await accountModel.findByEmail(login);
    } else {
      result = await accountModel.findByUsername(login);
    }

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  _: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await accountModel.findAll();

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
