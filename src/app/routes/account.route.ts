import express from 'express';

import { findAll } from '../controllers/account.controller';
import { findById } from '../controllers/account.controller';

export const account = express.Router();

account.get('/', findAll);
account.post('/find', findById);
