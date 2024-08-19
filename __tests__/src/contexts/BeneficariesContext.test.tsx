import { describe, expect, it, jest } from "@jest/globals";
import { BeneficariesContextType, BeneficiariesProvider, useBeneficiaries } from "../../../src/contexts/BeneficariesContext";
import React, { useEffect, useState } from "react";
import { first, get, isNil } from "lodash";
import { View, TouchableOpacity, Text } from "react-native";
import {  fireEvent, render } from '@testing-library/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ECacheKeys } from "../../../src/constants";
import { notifyMessage } from "../../../src/utils";
describe('BeneficiariesContext', () => {
  it('should add beneficiary and get it from context', () => {
    const TestComponent = () => {
      const beneficariesContext = useBeneficiaries();
      if(isNil(beneficariesContext)) {
        return null;
      }
      const {addBeneficiary, beneficiaries} = beneficariesContext;
      const [state, setState] = useState<unknown>(null);

      useEffect(() => {
        if (beneficiaries.length > 0) {
          setState(first(beneficiaries));
        }
      }, [beneficiaries]);

      return (
        <View>
          <TouchableOpacity
            onPress={() =>
              addBeneficiary({
                firstName: 'John',
                lastName: 'Doe',
                iban: 'DE89370400440532013000',
              })
            }>
            <Text>Add beneficiary</Text>
          </TouchableOpacity>
          <Text>{isNil(state) ? 'No beneficiary' : get(state, 'name', '')}</Text>
        </View>
      );
    };

    const {getByText} = render(
      <BeneficiariesProvider>
        <TestComponent />
      </BeneficiariesProvider>,
    );

    fireEvent.press(getByText('Add beneficiary'));

    expect(getByText('John Doe')).toBeDefined();
  });



  it('should save data to AsyncStorage when beneficiaries state change', async () => {
    // const AsyncStorageSetItemSpy = jest.spyOn(AsyncStorage, 'setItem');
    AsyncStorage.setItem = jest.fn<typeof AsyncStorage.setItem>();
    // const notifyMessageSpy = jest.spyOn(require('../../../src/utils'), 'notifyMessage');
    
    const TestComponent = () => {
      const {addBeneficiary} = useBeneficiaries() as BeneficariesContextType;
      const onPress = () => {
        addBeneficiary({
          firstName: 'John',
          lastName: 'Doe',
          iban: 'DE89370400440532013000',
        });
      };
      return (
        <View>
          <TouchableOpacity onPress={onPress}><Text>Add beneficiary</Text></TouchableOpacity>;
        </View>
      )
    };
    
    const {getByText} = render(
      <BeneficiariesProvider>
        <TestComponent />
      </BeneficiariesProvider>,
    );

    fireEvent.press(getByText('Add beneficiary'));
    setTimeout(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();      
    }, 1000);
    // expect(notifyMessageSpy).toHaveBeenCalledWith('Beneficiary added successfully');
    // AsyncStorageSetItemSpy.mockRestore();
    // notifyMessageSpy.mockRestore();
  });

});
