import * as PassportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { db } from '../../../main';
import { AccountDTO, DeserializedAccount } from '../account/account.interface';
import { tableName } from '../account/account.constant';

const LocalStrategy = PassportLocal.Strategy;

type Done = (
  error: any,
  account?: false | DeserializedAccount | undefined | number,
  options?: any
) => void;

export const initializePassport = (passport: any) => {
  const authenticateAccount = async (
    login: string,
    _password: string,
    done: Done
  ) => {
    let account: AccountDTO;

    try {
      // if login credential has '@', it is an email
      if (login.includes('@')) {
        account = await db.one(
          'SELECT * FROM "' + tableName + '" WHERE EMAIL = $1;',
          [login]
        );
      } else {
        account = await db.one(
          'SELECT * FROM "' + tableName + '" WHERE USERNAME = $1;',
          [login]
        );
      }

      if (!account) {
        return done(null, false, { message: 'account not found' });
      }

      const validated = await bcrypt.compare(_password, account.password);

      if (!validated) {
        return done(null, false, { message: 'invalid password' });
      }

      const { password = null, ...sanitized } = account;
      return done(null, sanitized);
    } catch (error) {
      return done(error);
    }
  };

  const options = { usernameField: 'login', passwordField: 'password' };
  passport.use(new LocalStrategy(options, authenticateAccount));

  passport.serializeUser((account: DeserializedAccount, done: Done) => {
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
    } catch (error) {
      done(error);
    }
  });
};
