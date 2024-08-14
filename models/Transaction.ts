import get from 'lodash/get';
export class Transaction {
  id: string;
  amount: number;
  account: string;

  constructor(id: string, amount: number, account: string) {
    this.id = id;
    this.amount = amount;
    this.account = account;
  }

  static instantiate(json: unknown) {
    const id = get(json, 'id', '');
    const amount = get(json, 'amount', 0);
    const account = get(json, 'account', '');
    return new Transaction(id, amount, account);
  }
}
