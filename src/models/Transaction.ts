import get from 'lodash/get';

export class Account {
  name: string;
  iban: string;
  constructor(name: string, iban: string) {
    this.name = name;
    this.iban = iban;
  }

  static instantiate(json: unknown) {
    const name = get(json, 'name', '');
    const iban = get(json, 'iban', '');
    return new Account(name, iban);
  }
}

export class Transaction {
  id: string;
  amount: number;
  account: Account;

  constructor(id: string, amount: number, account: Account) {
    this.id = id;
    this.amount = amount;
    this.account = account;
  }

  static instantiate(json: unknown) {
    const id = get(json, 'id', '');
    const amount = get(json, 'amount', 0);
    const currentBalance = get(json, 'currentBalance', 0);

    

    if (isNaN(amount)) {
      throw new Error('Amount must be a number');
    }
    if (amount > currentBalance) {
      throw new Error(
        `Amount cannot be greater than balance ($${currentBalance})`,
      );
    }
    if (amount < 1) {
      throw new Error('Amount cannot be less than $1');
    }

    const account = Account.instantiate(get(json, 'account', ''));
    return new Transaction(id, amount, account);
  }
}
