import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {Transaction, Account} from '../models';
import get from 'lodash/get';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce, isNumber} from 'lodash';
import { ECacheKeys } from '../constants';
export type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (amount: string, account: unknown) => void;
  balance: number;
};
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(1000);

  const addTransaction = (amount: string, account: unknown) => {
    const accountTransaction = Account.instantiate({
      name: get(account, 'name', ''),
      iban: get(account, 'iban', ''),
    });
    const regex = /^-?\d+(\.\d+)?$/;
    
    if(/^-?\d+(\.\d+)?$/.test(amount) === false)
      throw new Error('Amount must be a number');
    const amountParsed = parseFloat(amount);
    const newTransaction: Transaction = Transaction.instantiate({
      id: Date.now(),
      amount: amountParsed,
      account: accountTransaction,
      currentBalance: balance,
    });
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveDataToAsyncStorage = useCallback(
    debounce(() => {
      try {
        AsyncStorage.setItem(
          ECacheKeys.TRANSACTIONS_CONTEXT,
          JSON.stringify({transactions, balance}),
        );
      } catch (e) {}
    }, 1000),
    [transactions, balance],
  );

  useEffect(() => {
    saveDataToAsyncStorage();
  }, [transactions, balance, saveDataToAsyncStorage]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await AsyncStorage.getItem(ECacheKeys.TRANSACTIONS_CONTEXT);
        if (data) {
          const {transactions: transactionsCached, balance: balanceCached} =
            JSON.parse(data);
          setTransactions(transactionsCached);
          setBalance(balanceCached);
        }
      } catch (e) {}
    };

    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};
