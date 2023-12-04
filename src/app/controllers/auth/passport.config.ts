import { PassportStatic } from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { db } from '../../../main';
import { tableName } from '../account/account.constant';
import { queryResultErrorCode } from '../../shared/utils/error';

const LocalStrategy = PassportLocal.Strategy;

type Done = (
  error: Error | null,
  account?: false | Express.User | undefined | number,
  options?: PassportLocal.IVerifyOptions
) => void;

export const initializePassport = (passport: PassportStatic) => {
  const authenticateAccount = async (
    login: string,
    _password: string,
    done: Done
  ) => {
    try {
      const account = await db.one(
        'SELECT * FROM "' + tableName + '" WHERE email = $1 OR username = $2;',
        [login, login]
      );

      const validated = await bcrypt.compare(_password, account.password);

      if (!validated) {
        return done(null, false, { message: 'invalid password' });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password = null, ...sanitized } = account;

      return done(null, sanitized);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // this block is here instead of in the try {} block as 'if (!account) {...}', because
      // db returns error when there is nothing to return out of the query
      if (error.code === queryResultErrorCode.noData) {
        return done(null, false, { message: 'account not found' });
      }

      return done(error as Error);
    }
  };

  const options: PassportLocal.IStrategyOptions = {
    usernameField: 'login',
    passwordField: 'password',
  };
  passport.use(new LocalStrategy(options, authenticateAccount));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser((account: Express.User | any, done: Done) => {
    console.log({
      method: 'serializeUser',
      error: null,
      from: account,
      to: account.id,
    });
    done(null, account.id);
  });

  passport.deserializeUser(async (id: number, done: Done) => {
    try {
      const account = await db.one(
        'SELECT * FROM "' + tableName + '" WHERE ID = $1;',
        [id]
      );

      console.log({
        method: 'deserializeUser',
        error: null,
        from: id,
        to: account,
      });
      done(null, account);
    } catch (error: unknown) {
      done(error as Error);
    }
  });
};
