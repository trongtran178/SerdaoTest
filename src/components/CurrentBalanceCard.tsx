import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  currentBalance: number;
};

export const CurrentBalanceCard: React.FC<Props> = ({currentBalance}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.balanceText}>Current Balance</Text>
      <Text style={styles.balanceAmount}>{`$${currentBalance.toFixed(
        2,
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 5, // for iOS shadow
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
});
