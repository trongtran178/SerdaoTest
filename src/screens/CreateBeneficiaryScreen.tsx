import isNil from 'lodash/isNil';
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonTextInput} from '../components/CommonTextInput';
import {useBeneficiaries} from '../contexts/BeneficariesContext';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icons} from '../assets';

type Props = NativeStackScreenProps<ParamListBase, 'CreateBeneficiary'>;

const CreateBeneficaryScreen = ({navigation}: Props) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [iban, setIban] = useState<string>('');

  const beneficiariesContext = useBeneficiaries();

  if (isNil(beneficiariesContext)) {
    return null;
  }
  const {addBeneficiary} = beneficiariesContext;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onCreate = useCallback(() => {
    const newBeneficiary = addBeneficiary({firstName, lastName, iban});
    if (!isNil(newBeneficiary)) {
      setFirstName('');
      setLastName('');
      setIban('');
      navigation.goBack();
    }
  }, [addBeneficiary, firstName, iban, lastName, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <CommonTextInput
          testID='textinput_firstname'
          onChangeText={setFirstName}
          value={firstName}
          maxLength={50}
          placeholder="Enter first name"
        />
        <View>
          <Image source={Icons.name} style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <CommonTextInput
          testID='textinput_lastname'
          onChangeText={setLastName}
          value={lastName}
          maxLength={50}
          placeholder="Enter last name"
        />
        <View>
          <Image source={Icons.name} style={styles.icon} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <CommonTextInput
          testID='textinput_iban'
          onChangeText={setIban}
          value={iban}
          maxLength={34}
          placeholder="Enter IBAN number"
        />
        <View>
          <Image source={Icons.iban_number} style={styles.icon} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onCreate}>
        <Text style={styles.buttonText}>Create beneficiary</Text>
      </TouchableOpacity>
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
  icon: {
    position: 'absolute',
    top: -12,
    right: 12,
    width: 20,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default CreateBeneficaryScreen;
