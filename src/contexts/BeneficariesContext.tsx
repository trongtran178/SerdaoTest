import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash/debounce';
import toString from 'lodash/toString';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Beneficiary} from '../models';
import {notifyMessage} from '../utils';
import { ECacheKeys } from '../constants';

export type BeneficariesContextType = {
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficary: unknown) => Beneficiary | undefined;
};

const BeneficariesContext = createContext<BeneficariesContextType | undefined>(
  undefined,
);

export const useBeneficiaries = () => useContext(BeneficariesContext);

export const BeneficiariesProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {}, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveDataToAsyncStorage = useCallback(
    debounce(async () => {
      try {
        await AsyncStorage.setItem(
          ECacheKeys.BENEFICIARIES_CONTEXT,
          JSON.stringify(beneficiaries),
        );
      } catch (e) { }
    }, 1000),
    [beneficiaries],
  );

  useEffect(() => {
    saveDataToAsyncStorage();
  }, [beneficiaries, saveDataToAsyncStorage]);

  useEffect(() => {
    const getBeneficiaries = async () => {
      const result = await AsyncStorage.getItem(ECacheKeys.BENEFICIARIES_CONTEXT);
      if (result) {
        const parsed = JSON.parse(result);
        setBeneficiaries(parsed);
      }
    };
    getBeneficiaries();
  }, []);

  const addBeneficiary = (beneficary: unknown) => {
    try {
      const newBeneficiary = Beneficiary.instantiate(beneficary);
      setBeneficiaries(prevBeneficiaries => [
        ...prevBeneficiaries,
        newBeneficiary,
      ]);
      notifyMessage('Beneficiary added successfully');
      return newBeneficiary;
    } catch (e) {
      notifyMessage(toString(e));
    }
  };
  return (
    <BeneficariesContext.Provider value={{beneficiaries, addBeneficiary}}>
      {children}
    </BeneficariesContext.Provider>
  );
};
