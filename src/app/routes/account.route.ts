import express from 'express';
import {
  findAll,
  findAccount,
} from '../controllers/account/account.controller';

export const account = express.Router();

account.get('/', findAll);
account.post('/login', findAccount);
