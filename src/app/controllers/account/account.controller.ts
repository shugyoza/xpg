import { Request, Response, NextFunction } from 'express';

import accountModel from '../../db/account.model';
import { errorHandler } from '../../shared/utils/error';

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
    next(errorHandler(400, 'Invalid credentials'));
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
    console.error(error);

    next(errorHandler(400, 'Bad request'));
  }
};
