import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useTransactions} from './TransactionContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import isNil from 'lodash/isNil';
import {Beneficiary} from './models';
import {ParamListBase} from '@react-navigation/native';

type Props = NativeStackScreenProps<ParamListBase, 'Transaction'>;

const TransactionScreen = ({navigation}: Props) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const transactionContext = useTransactions();
  if (isNil(transactionContext)) {
    return null;
  }
  const {addTransaction} = transactionContext;
  const handleTransaction = () => {
    const accountDetails = Beneficiary.instantiate({name, iban});

    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
  },
});

export default TransactionScreen;
