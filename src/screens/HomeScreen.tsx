import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTransactions} from '../contexts/TransactionContext';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import isNil from 'lodash/isNil';
import {ParamListBase} from '@react-navigation/native';
import {CurrentBalanceCard} from '../components/CurrentBalanceCard';
import {TransactionList} from '../components/TransactionList';

export type Props = NativeStackScreenProps<ParamListBase, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const transactionContext = useTransactions();
  if (isNil(transactionContext)) {
    return null;
  }
  const {transactions, balance} = transactionContext;

  return (
    <ScrollView style={styles.container}>
      <CurrentBalanceCard currentBalance={balance} />
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, {marginRight: 4}, {backgroundColor: '#4CAF50'}]}
          onPress={() => navigation.navigate('Transaction')}>
          <Text style={[styles.buttonText]}>Add Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {marginLeft: 4}]}
          onPress={() => navigation.navigate('CreateBeneficiary')}>
          <Text style={styles.buttonText}>Create Beneficiary</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Transaction History</Text>
      <TransactionList transactions={transactions} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', // Material Design green
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
    marginVertical: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#2196F3', // Material Design blue
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
