import { describe, it, expect, jest } from "@jest/globals";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { render } from "@testing-library/react-native";
import { TransactionProvider } from "../../../src/contexts/TransactionContext";
import { TransactionScreen } from "../../../src/screens";
import { BeneficiariesProvider } from "../../../src/contexts/BeneficariesContext";

describe('TransactionScreen', () => {
  it('should render correctly', () => {
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
      getKey: jest.fn().mockReturnValue("Transaction"),
      isFirstRouteInParent: jest.fn().mockReturnValue(true),
      type: "native",
      name: "Transaction",
      replace: jest.fn(),
      push: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
    } as unknown as NativeStackNavigationProp<ParamListBase, "Transaction", undefined>;

    const routeMock = {
      key: "Transaction",
      name: "Transaction",
      params: {}
    } as const;

    const { toJSON } = render(
      <TransactionProvider>
        <BeneficiariesProvider>
            <TransactionScreen navigation={navigationMock} route={routeMock} />
        </BeneficiariesProvider>
      </TransactionProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
