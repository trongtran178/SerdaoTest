import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CreateBeneficiaryScreen from '../../../src/screens/CreateBeneficiaryScreen';
import { describe, it, jest, expect } from '@jest/globals';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { BeneficariesContextType, BeneficiariesProvider, useBeneficiaries } from '../../../src/contexts/BeneficariesContext';
import { Command } from 'commander';
import { Text } from 'react-native';

describe('CreateBeneficiaryScreen', () => {
    const navigationMock = {
        navigate: jest.fn(),
        goBack: jest.fn(),
        canGoBack: jest.fn(),
        setOptions: jest.fn(),
        setParams: jest.fn(),
        dispatch: jest.fn(),
        isFocused: jest.fn(),
        dangerouslyGetState: jest.fn(),
        dangerouslyGetParent: jest.fn(),
        getState: jest.fn(),
        reset: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addKeyedListener: jest.fn(),
        removeKeyedListener: jest.fn(),
        launch: jest.fn(),
        dismiss: jest.fn(),
        getParent: jest.fn(),
        getKey: jest.fn().mockReturnValue("Home"),
        isFirstRouteInParent: jest.fn().mockReturnValue(true),
        type: "native",
        name: "Home",
        replace: jest.fn(),
        push: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
    } as unknown as NativeStackNavigationProp<ParamListBase, "CreateBeneficiary", undefined>;
    
    const routeMock = {
        key: "CreateBeneficiary",
        name: "CreateBeneficiary",
        params: {}
      } as const;

  it('renders correctly', () => {
    const routeMock = {
        key: "CreateBeneficiary",
        name: "CreateBeneficiary",
        params: {}
      } as const;
  

    const { toJSON } = render(
        <BeneficiariesProvider>
            <CreateBeneficiaryScreen navigation={navigationMock} route={routeMock} />
        </BeneficiariesProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should return null when beneficiaries context is nil', () => {
 
    const routeMock = {
      key: "CreateBeneficiary",
      name: "CreateBeneficiary",
      params: {}
    } as const;
  

    const { toJSON } = render(
      <CreateBeneficiaryScreen navigation={navigationMock} route={routeMock} />
    );

    expect(toJSON()).toBeNull();
  });

  
  it('should call onCreate when press Create beneficiary', () => {  

    const TestComponent = () => { 
        const beneficiariesContext = useBeneficiaries();
        const {beneficiaries} = beneficiariesContext as BeneficariesContextType;
        return (
            <> 
                {beneficiaries.length > 0 && <Text>{beneficiaries[0].name}</Text>}
                <CreateBeneficiaryScreen navigation={navigationMock} route={routeMock} />
            </>
        )
    }

    const { getByText, getByTestId } = render(
      <BeneficiariesProvider>
        <TestComponent />
      </BeneficiariesProvider>
    );
    fireEvent.changeText(getByTestId('textinput_firstname'), 'John');
    fireEvent.changeText(getByTestId('textinput_lastname'), 'Doe');
    fireEvent.changeText(getByTestId('textinput_iban'), 'AT483200000012345864');
    fireEvent.press(getByText('Create beneficiary'));

    expect(getByText('John Doe')).toBeDefined();

    fireEvent.changeText(getByTestId('textinput_firstname'), '');
    fireEvent.changeText(getByTestId('textinput_lastname'), '');
    fireEvent.changeText(getByTestId('textinput_iban'), 'AT483200000012345864');
    fireEvent.press(getByText('Create beneficiary'));
    expect(getByTestId('textinput_iban').props.value).toEqual('AT483200000012345864');
  });

});
