import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {Transaction} from '../models';
import {Icons} from '../assets';

type Props = {
  transactions: Transaction[];
};

export const TransactionList: React.FC<Props> = ({transactions}) => {
  const renderListEmptyComponent = useCallback(() => {
    return (
      <View testID='tranhis-list-empty-component' style={styles.emptyListContainer}>
        <Image source={Icons.empty_transaction} style={styles.emptyListIcon} />
        <Text style={styles.emptyListTitle}>No Transaction History</Text>
        <Text style={styles.emptyListMessage}>
          You haven't made any transactions yet. Start by sending or receiving
          money!
        </Text>
      </View>
    );
  }, []);

  const renderItem = ({item}: {item: Transaction}) => (
    <View testID={`transaction-item`} style={styles.transactionItem}>
      <Text testID='transaction-id' style={styles.transactionId}>ID: {item.id}</Text>
      <Text testID='transaction-amount' style={styles.transactionAmount}>
        Amount: ${item.amount.toFixed(2)}
      </Text>
      <Text testID='transaction-to' style={styles.transactionTo}>To: {item.account.name}</Text>
      <Text testID='transaction-iban' style={styles.transactionIban}>IBAN: {item.account.iban}</Text>
    </View>
  );

  return (
    <FlatList
      ListEmptyComponent={renderListEmptyComponent}
      scrollEnabled={false}
      data={transactions}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {},
  transactionItem: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 5, // for iOS shadow
  },
  transactionId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Material Design green
    marginBottom: 5,
  },
  transactionTo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  transactionIban: {
    fontSize: 14,
    color: '#333',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyListMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyListButton: {
    backgroundColor: '#4CAF50', // Material Design green
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  emptyListButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
