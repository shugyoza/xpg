import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import accountModel from '../../db/account.model';
import { db } from '../../../main';
import { errorHandler } from '../../shared/utils/error';
import { AccountDTO } from './account.interface';
import { tableName } from './account.constant';

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
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, username, role } = request.body;
  const query = {
    text:
      'INSERT INTO "' +
      tableName +
      '" (email, username, role, password) VALUES($1, $2, $3, $4) RETURNING id;',
    values: [email, username, role],
  };

  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    query.values = [...query.values, hashedPassword];

    // a successful registration will get a response of the generated account id
    const result = await db.one(query);

    if (!result) {
      next(errorHandler(409, error.message || 'username and/or email exists'));
    }

    response.status(201).json({
      ok: true,
      status: 'success',
      message: 'account created',
      result,
    });
  } catch (error) {
    next(error);
  }
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
  let account: AccountDTO;

  try {
    // if login credential has '@', it is an email
    if (request.body.login.includes('@')) {
      account = await db.one(
        'SELECT * FROM "' + tableName + '" WHERE EMAIL = $1;',
        [request.body.login]
      );
    } else {
      account = await db.one(
        'SELECT * FROM "' + tableName + '" WHERE USERNAME = $1;',
        [request.body.login]
      );
    }

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
