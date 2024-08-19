import { describe, it, expect, jest } from "@jest/globals";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { render, waitFor } from "@testing-library/react-native";
import { TransactionProvider } from "../../../src/contexts/TransactionContext";
import { TransactionScreen } from "../../../src/screens";
import { BeneficiariesProvider } from "../../../src/contexts/BeneficariesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe('TransactionScreen', () => {
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

  it('should render correctly', () => {

    const { toJSON } = render(
      <TransactionProvider>
        <BeneficiariesProvider>
            <TransactionScreen navigation={navigationMock} route={routeMock} />
        </BeneficiariesProvider>
      </TransactionProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })


  it('should return null when transaction context is nil', () => {
    const { toJSON } = render(
      <TransactionScreen navigation={navigationMock} route={routeMock} />
    );

    expect(toJSON()).toBeNull();
  })

  it('should return null when beneficiaries context is nil', () => {
    const { toJSON } = render(
      <TransactionProvider>
        <TransactionScreen navigation={navigationMock} route={routeMock} />
      </TransactionProvider>
    );
    expect(toJSON()).toBeNull();
  })

  it('should show image icon choose_beneficiary when beneficiaries array is not empty', async () => {

    AsyncStorage.getItem = jest.fn<typeof AsyncStorage.getItem>().mockResolvedValue(
      "{\"beneficiaries\":[{\"firstName\":\"John\",\"lastName\":\"Doe\",\"iban\":\"DE89370400440532013000\"}]}"
    );

    const { getByTestId } = await waitFor(() => render(
      <TransactionProvider>
        <BeneficiariesProvider>
            <TransactionScreen navigation={navigationMock} route={routeMock} />
        </BeneficiariesProvider>
      </TransactionProvider>
    ));
    expect(getByTestId('choose_beneficiary_image')).toBeDefined();
  })

})
