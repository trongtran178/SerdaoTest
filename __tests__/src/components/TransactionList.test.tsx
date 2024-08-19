import { describe, it, expect } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { TransactionList } from "../../../src/components/TransactionList";
import { Transaction } from "../../../src/models";

describe('TransactionList', () => {
  it('should render list of transactions', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        amount: 100,
        account: {
          name: 'John Doe',
          iban: 'BI1320001100010000123456789',
        },
      },
      {
        id: '2',
        amount: 200,
        account: {
          name: 'Jane Doe',
          iban: 'BI1320001100010000123456789',
        },
      },
    ];

    const {getAllByTestId} = render(<TransactionList transactions={transactions} />);

    const transactionItems = getAllByTestId('transaction-item');

    expect(transactionItems).toHaveLength(transactions.length);
  });

  it('should render empty list component when no transactions', () => {
    const {queryByTestId} = render(<TransactionList transactions={[]} />);

    expect(queryByTestId('tranhis-list-empty-component')).toBeDefined();
  });
});
