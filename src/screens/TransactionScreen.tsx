/* eslint-disable react-hooks/rules-of-hooks */
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import isNil from 'lodash/isNil';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTransactions} from '../contexts/TransactionContext';
import {Beneficiary} from '../models';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {useBeneficiaries} from '../contexts/BeneficariesContext';
import {notifyMessage} from '../utils';
import toString from 'lodash/toString';
import {Account} from '../models/Transaction';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {Icons} from '../assets';
import {CommonTextInput} from '../components/CommonTextInput';
import {isArray} from 'lodash';
type Props = NativeStackScreenProps<ParamListBase, 'Transaction'>;

function BottomSheetFlatListHeader() { 
  return ( 
    <Text style={styles.bottomSheetFlatListHeader}>Choose Beneficiary</Text>
  )
}

const TransactionScreen = ({navigation}: Props) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const transactionContext = useTransactions();
  const beneficiariesContext = useBeneficiaries();
  if (isNil(transactionContext)) {
    return null;
  }
  if (isNil(beneficiariesContext)) {
    return null;
  }
  const {addTransaction} = transactionContext;
  const {beneficiaries} = beneficiariesContext;

  const handleTransaction = useCallback(() => {
    try {
      const accountDetails = Account.instantiate({name, iban});
      addTransaction(amount, accountDetails);
      navigation.goBack();
    } catch (e) {
      notifyMessage(toString(e));
    }
  }, [addTransaction, amount, iban, name, navigation]);

  // variables
  const data = useMemo(() => beneficiaries, [beneficiaries]);

  const refSheet = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleChooseBeneficiary = (beneficiary: Beneficiary) => {
    refSheet.current?.close();
    setName(beneficiary.name);
    setIban(beneficiary.iban);
  };

  // render
  const renderItem = ({item}: {item: Beneficiary}) => {
    const text = item.name + ' - ' + item.iban;

    const isActive = item.name === name && item.iban === iban;

    const activeStyle = isActive
      ? {
          backgroundColor: '#007bff',
          borderColor: '#007bff',
        }
      : {};
      const activeText = isActive ? {
        color: '#fff'}: {}
    return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        styles.materialDesignItem,
        styles.chooseItem,
        activeStyle
      ]}
      onPress={() => handleChooseBeneficiary(item)}>
      <View style={styles.materialDesignItemContent}>
        <Text style={[styles.materialDesignItemText, activeText]}>{text}</Text>
      </View>
    </TouchableOpacity>
    )
  }

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    refSheet.current?.snapToIndex(index);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    refSheet.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // Disappears when the bottom sheet is closed
        appearsOnIndex={0} // Appears when the bottom sheet is opened
        onPress={handleCloseBottomSheet} // Close bottom sheet when pressing the backdrop
      />
    ),
    [handleCloseBottomSheet],
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <CommonTextInput
          onChangeText={setAmount}
          value={amount}
          autoFocus
          keyboardType="numeric"
          placeholder="Enter amount"
          inputMode="decimal"
        />
        <View>
          <Image source={Icons.dollar_currency} style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <CommonTextInput
          onChangeText={setName}
          value={name}
          placeholder="Recipient Name"
        />
        {isArray(beneficiaries) && beneficiaries.length > 0 ? (
          <TouchableOpacity onPress={() => {
            Keyboard.dismiss();
            handleSnapPress(0)
          }}>
            <Image testID='choose_beneficiary_image' source={Icons.choose_beneficiary} style={styles.icon} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <CommonTextInput
          onChangeText={setIban}
          value={iban}
          placeholder="Recipient IBAN"
        />
        <View>
          <Image source={Icons.iban_number} style={styles.icon} />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleTransaction}>
        <Text style={styles.buttonText}>Submit Transaction</Text>
      </TouchableOpacity>

      <BottomSheet
        index={-1}
        enablePanDownToClose
        ref={refSheet}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop} // Use custom backdrop
        onChange={handleSheetChange}>
        <BottomSheetFlatList
          ListHeaderComponent={<BottomSheetFlatListHeader />}
          data={data}
          keyExtractor={item => item.iban}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    top: -12,
    right: 12,
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Material Design green
    marginVertical: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 5, // for iOS shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  materialDesignItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 5, // for iOS shadow
  },
  materialDesignItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  materialDesignItemText: {
    fontSize: 16,
    color: '#333',
  },
  chooseItem: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  bottomSheetFlatListHeader: { 
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  }
});

export default TransactionScreen;
