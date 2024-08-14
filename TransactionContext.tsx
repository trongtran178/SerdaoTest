import React, {createContext, useState, useContext} from 'react';
import {Beneficiary, Transaction} from './models';

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (amount: string, account: Beneficiary) => void;
  balance: number;
};
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(1000);

  const addTransaction = (amount: string, account: Beneficiary) => {
    const newTransaction: Transaction = Transaction.instantiate({
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    });
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};
