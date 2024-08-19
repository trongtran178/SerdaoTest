import { describe, it, expect } from "@jest/globals";
import { Transaction, Account } from "../../../src/models";

describe('Transaction', () => {
  it('should throw error when amount is not a number', () => {
    // @ts-ignore
    expect(() => Transaction.instantiate({
      id: '1',
      amount: 'safafas',
      currentBalance: 1000,
      account: {
        name: 'test name',
        iban: 'test iban',
      }
      
    })).toThrowError()
  });

  it('should throw error when amount is negative', () => {
    expect(() => Transaction.instantiate({
      id: '1',
      amount: -100,
      currentBalance: 1000,
      account: {
        name: 'test name',
        iban: 'test iban',
      }
    })).toThrowError('Amount cannot be less than $1');

    expect(() => Transaction.instantiate({
      id: '1',
      amount: -1,
      currentBalance: 1000,
      account: {
        name: 'test name',
        iban: 'test iban',
      }
    })).toThrowError('Amount cannot be less than $1');
  });


  it('should throw error when amount is greater than balance', () => {
    const currentBalance = 50
    expect(() => Transaction.instantiate({
      id: '1',
      amount: 100,
      currentBalance,
      account: {
        name: 'test name',
        iban: 'test iban',
      }
    })).toThrowError(`Amount cannot be greater than balance ($${currentBalance})`)
  });
});
