import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import CreateBeneficiaryScreen from '../../../src/screens/CreateBeneficiaryScreen';
import { describe, it, jest, expect } from '@jest/globals';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { BeneficiariesProvider } from '../../../src/contexts/BeneficariesContext';

describe('CreateBeneficiaryScreen', () => {
  it('renders correctly', () => {
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
  

    const { toJSON } = render(
        <BeneficiariesProvider>
            <CreateBeneficiaryScreen navigation={navigationMock} route={routeMock} />
        </BeneficiariesProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
