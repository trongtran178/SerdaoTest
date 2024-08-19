import { describe, expect, it, jest } from "@jest/globals";
import { BeneficariesContextType, BeneficiariesProvider, useBeneficiaries } from "../../../src/contexts/BeneficariesContext";
import React, { useEffect, useState } from "react";
import { first, get, isNil } from "lodash";
import { View, TouchableOpacity, Text } from "react-native";
import {  fireEvent, render, waitFor } from '@testing-library/react-native';
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
  });


  it('should load beneficiaries from AsyncStorage when application starts', async () => {
    AsyncStorage.getItem = jest.fn<typeof AsyncStorage.getItem>().mockResolvedValue(
      "{\"beneficiaries\":[{\"firstName\":\"John\",\"lastName\":\"Doe\",\"iban\":\"DE89370400440532013000\"}]}"
    );
    const TestComponent = () => {
      const {beneficiaries, addBeneficiary} = useBeneficiaries() as BeneficariesContextType;
      const onPress = () => {
        addBeneficiary({
          firstName: 'John',
          lastName: 'Doe',
          iban: 'DE89370400440532013000',
        });
      };
      const beneficiary = first(beneficiaries);
      return (
        <View>
          <TouchableOpacity onPress={onPress}><Text>Add beneficiary</Text></TouchableOpacity>;
          {isNil(beneficiary) ? <Text>No beneficiary</Text> : null}
        </View>
      )
    };
    const {getByText} = await waitFor(() => render(
      <BeneficiariesProvider>
        <TestComponent />
      </BeneficiariesProvider>,
    ));
    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalled());  
    setTimeout(() => expect(() => getByText('No beneficiary')).toThrowError(), 100);                 
    
  });

});
