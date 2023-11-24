import { AccountDTO } from '../controllers/account/account.interface';
import { db } from '../../main';
import { constants } from '../shared/constants/account.constant';

const { tableName } = constants;

const findAll = async (): Promise<AccountDTO[]> => {
  const text = 'SELECT * FROM "' + tableName + '";';

  return await db
    .any(text)
    .then((result: AccountDTO[]) => result)
    .catch((error: Error) => console.error(error));
};

const findByEmail = async (
  email: string,
  tableName = constants.tableName
): Promise<AccountDTO> => {
  const text = 'SELECT * FROM "' + tableName + '"WHERE EMAIL = $1;';
  const values = [email];

  return await db
    .one(text, values)
    .then((result: AccountDTO) => result)
    .catch((error: Error) => console.error(error));
};

const findByUsername = async (
  username: string,
  tableName = constants.tableName
): Promise<AccountDTO> => {
  const text = 'SELECT * FROM "' + tableName + '" WHERE USERNAME = $1;';
  const values = [username];

  return await db
    .one(text, values)
    .then((result: AccountDTO) => result)
    .catch((error: Error) => console.error(error));
};

export default {
  findAll,
  findByEmail,
  findByUsername,
};
