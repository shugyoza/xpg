import { AccountDTO } from '../controllers/account/account.interface';
import { db } from '../../main';
import { tableName } from '../controllers/account/account.constant';

const addOne = async (register: AccountDTO) => {
  const { email, username, password, role } = register;
  const query = {
    text:
      'INSERT INTO "' +
      tableName +
      '" (email, username, password, role) VALUES($1, $2, $3, $4)',
    values: [email, username, password, role],
  };

  return await db
    .one(query)
    .then((result: AccountDTO) => result)
    .catch((error: Error) => console.error(error));
};

const findAll = async (): Promise<AccountDTO[]> => {
  const text = 'SELECT * FROM "' + tableName + '";';

  return await db
    .any(text)
    .then((result: AccountDTO[]) => result)
    .catch((error: Error) => console.error(error));
};

const findByEmail = async (email: string): Promise<AccountDTO> => {
  const text = 'SELECT * FROM "' + tableName + '" WHERE EMAIL = $1;';
  const values = [email];

  return await db
    .one(text, values)
    .then((result: AccountDTO) => result)
    .catch((error: Error) => console.error(error));
};

const findByUsername = async (username: string): Promise<AccountDTO> => {
  const text = 'SELECT * FROM "' + tableName + '" WHERE USERNAME = $1;';
  const values = [username];

  return await db
    .one(text, values)
    .then((result: AccountDTO) => result)
    .catch((error: Error) => console.error(error));
};

const findById = async (id: number): Promise<AccountDTO> => {
  const text = 'SELECT * FROM "' + tableName + '" WHERE ID = $1;';
  const values = [id];

  return await db
    .one(text, values)
    .then((result: AccountDTO) => result)
    .catch((error: Error) => console.error(error));
};

export default {
  findAll,
  findByEmail,
  findByUsername,
  findById,
  addOne,
};
