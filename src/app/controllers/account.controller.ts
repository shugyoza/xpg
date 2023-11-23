import { NextFunction, Request, Response } from 'express';

import { Account } from '../database/models/account.model';

export async function findAll(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const accounts = await Account.findAll();
    response.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
}

export async function findById(
  request: Request,
  response: Response,
  _next: NextFunction
) {
  const { id } = request.body;
  const account = await Account.findByPk(id);
  response.status(200).json(account);
}
