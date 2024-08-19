import { describe, it, expect, jest } from "@jest/globals";
import { render, fireEvent, screen, waitFor } from "@testing-library/react-native";
import { TouchableOpacity, Text, View } from "react-native";
import { useBeneficiaries, BeneficiariesProvider, BeneficariesContextType } from "../../../src/contexts/BeneficariesContext";
import { useTransactions, TransactionProvider, TransactionContextType } from "../../../src/contexts/TransactionContext";
import { TransactionList } from "../../../src/components/TransactionList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ECacheKeys } from "../../../src/constants";

describe('TransactionContext', () => {
  it('should add transaction and get it from context', () => {
    const TestComponent = () => {
      const {transactions, addTransaction} = useTransactions() as TransactionContextType;
      const onClick = () => {
        addTransaction('123', {name: 'John Doe', iban: 'BI1320001100010000123456789'});
      };
      return (
        <View>
            <TouchableOpacity onPress={onClick}><Text>Add transaction</Text></TouchableOpacity>;
            <TransactionList transactions={transactions} />
        </View>
      )
    };
    const {getByText, findByTestId, getByTestId} = render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>,
    );
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
    fireEvent.press(getByText('Add transaction'));
    expect(() => getByTestId('tranhis-list-empty-component')).toThrowError('Unable to find an element with testID: tranhis-list-empty-component');
  });


  it('should not add transaction with negative amount', () => {
    const TestComponent = () => {
      const {transactions, addTransaction} = useTransactions() as TransactionContextType;
      const onPress = () => {
        addTransaction('-123', {name: 'John Doe', iban: 'BI1320001100010000123456789'});
      };
      return (
        <View>
            <TouchableOpacity onPress={onPress}><Text>Add transaction</Text></TouchableOpacity>;
            <TransactionList transactions={transactions} />
        </View>
      )
    };
    const {getByText, getByTestId} = render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>,
    );
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
    expect(() => fireEvent.press(getByText('Add transaction'))).toThrowError();
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
  });

  it('should not add transaction with infitinite amount', () => {
    const TestComponent = () => {
      const {transactions, addTransaction} = useTransactions() as TransactionContextType;
      const onPress = () => {
        addTransaction('Infinity', {name: 'John Doe', iban: 'BI1320001100010000123456789'});
      };
      return (
        <View>
            <TouchableOpacity onPress={onPress}><Text>Add transaction</Text></TouchableOpacity>;
            <TransactionList transactions={transactions} />
        </View>
      )
    };
    const {getByText, findByTestId, getByTestId} = render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>,
    );
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
    expect(() => fireEvent.press(getByText('Add transaction'))).toThrowError();
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
  });

  it('should not add transaction with invalid type amount', () => {
    const TestComponent = () => {
      const {transactions, addTransaction} = useTransactions() as TransactionContextType;
      const onPress = () => 
        addTransaction('123a', {name: 'John Doe', iban: 'BI1320001100010000123456789'});
      return (
        <View>
            <TouchableOpacity onPress={onPress}><Text>Add transaction</Text></TouchableOpacity>;
            <TransactionList transactions={transactions} />
        </View>
      )
    };
    const {getByText, getByTestId} = render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>,
    );
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
    expect(() => fireEvent.press(getByText('Add transaction'))).toThrowError();
    expect(getByTestId('tranhis-list-empty-component')).toBeDefined();
  });

  it('should add beneficiary and get it from context', () => {
    const TestComponent = () => {
      const {addBeneficiary, beneficiaries} = useBeneficiaries() as BeneficariesContextType;
      const onPress = () => {
        addBeneficiary({firstName: 'John', lastName: 'Doe', iban: 'BI1320001100010000123456789'});        
      };
      return (
        <View>
          <Text testID="beneficiaries">{beneficiaries.length}</Text>
          <TouchableOpacity onPress={onPress}><Text>Add beneficiary</Text></TouchableOpacity>;
        </View>
      )
    };
    const {getByText, getByTestId} = render(
      <BeneficiariesProvider>
        <TestComponent />
      </BeneficiariesProvider>,
    );
    fireEvent.press(getByText('Add beneficiary'));
    expect(screen.getByText('1')).toBeDefined();  
  });

  it('should get balance from context', () => {
    const TestComponent = () => {
      const {balance} = useTransactions() as TransactionContextType;
      return <Text>{balance}</Text>;
    };
    const {getByText} = render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>,
    );
    expect(getByText('1000')).toBeDefined();
  });


  it('should load transactions from AsyncStorage when application starts', async () => {
    AsyncStorage.getItem = jest.fn<typeof AsyncStorage.getItem>().mockResolvedValue(
      "{\"transactions\":[{\"id\":1,\"amount\":100,\"account\":{\"name\":\"John Doe\",\"iban\":\"BI1320001100010000123456789\"}}],\"balance\":900}"
    );
    const TestComponent = () => {
      const {transactions, balance} = useTransactions() as TransactionContextType;
      return (
        <View>
          <Text>{transactions.length}</Text>;
          <Text>{balance}</Text>;
        </View>
      )
    };
       
    const {getByText, findByText, toJSON} = await waitFor(() => render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>,
    ));
    console.log('log-155', toJSON());
    expect(getByText('900')).toBeDefined(); // balance;
    expect(getByText('1')).toBeDefined(); // balance;
    expect(() => getByText('2')).toThrowError(); // balance;
  });

  it('should save data to AsyncStorage when transactions state change', async () => {
    const TestComponent = () => {
      const {addTransaction} = useTransactions() as TransactionContextType;
      const onPress = () => {
        addTransaction(
          '100',
          {
            name: 'Jane Doe',
            iban: 'BI1320001100010000123456789',
        });
      };
      return (
        <View>
          <TouchableOpacity onPress={onPress}><Text>Add transaction</Text></TouchableOpacity>;
        </View>
      )
    };
    const {getByText} = render(
      <TransactionProvider>
        <TestComponent />
      </TransactionProvider>
    );
    fireEvent.press(getByText('Add transaction'));

    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalled(), {
      timeout: 1100
    })
  });
});
