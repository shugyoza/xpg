import express from 'express';
import passport from 'passport';

import {
  findAll,
  register,
  login,
  logout,
} from '../controllers/account/account.controller';
import { accountValidators, loginValidators } from '../controllers/validators';

export const account = express.Router();

account.get('/', findAll);
account.post('/register', accountValidators, register);

const options = {
  successMessage: 'success',
  failureMessage: 'fail',
};
account.post(
  '/login',
  loginValidators,
  passport.authenticate('local', options),
  login
);
account.post('/logout', logout);
