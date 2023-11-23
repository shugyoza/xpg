import { DataTypes, Model, Optional } from 'sequelize';

import { db } from '.';

export enum AccountRole {
  SUPER = 'super',
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

const roles = [
  AccountRole.SUPER,
  AccountRole.OWNER,
  AccountRole.ADMIN,
  AccountRole.USER,
];

enum LoginLabel {
  EMAIL = 'email',
  USERNAME = 'username',
}

export class LoginDTO {
  username?: string;
  email?: string;
  password!: string;
}

export class RegisterDTO extends LoginDTO {
  username!: string;
  email!: string;
  confirmPassword!: string;
}

class AccountDTO extends RegisterDTO {
  readonly id!: number;
  readonly role!: AccountRole;
}

interface AccountAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  role: AccountRole;
}

// means this property can be undefined at the time of creation
interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}

export class AccountInstance extends Model<
  AccountAttributes,
  AccountCreationAttributes
> {
  createdAt?: Date;
  updatedAt?: Date;
}

const tableName = 'Accounts';

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(...roles),
    defaultValue: AccountRole.USER,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export const Account = db.sequelize.define<AccountInstance>(
  'Account',
  attributes
);
