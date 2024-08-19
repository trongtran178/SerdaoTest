import { describe, it, expect, jest } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react-native"
import { HomeScreen } from "../../../src/screens"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TransactionProvider } from "../../../src/contexts/TransactionContext"

describe('HomeScreen', () => {

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
} as unknown as NativeStackNavigationProp<ParamListBase, "Home", undefined>;

const routeMock = {
  key: "Home",
  name: "Home",
  params: {}
} as const;

  it('should render correctly', () => {

    const { toJSON } = render(
        <TransactionProvider>
            <HomeScreen navigation={navigationMock} route={routeMock} />
        </TransactionProvider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  
  it('should return null when transaction context is nil', () => {
    const { toJSON } = render(
        <HomeScreen navigation={navigationMock} route={routeMock} />
    );

    expect(toJSON()).toBeNull();
  })


  it('should call navigation.navigate when presss Add Transaction', () => {

    render(
      <TransactionProvider>
          <HomeScreen navigation={navigationMock} route={routeMock} />
      </TransactionProvider>
    );

    fireEvent.press(screen.getByText('Add Transaction'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('Transaction');
  })


  it('should call navigation.navigate when presss Create Beneficiary', () => {

    render(
      <TransactionProvider>
          <HomeScreen navigation={navigationMock} route={routeMock} />
      </TransactionProvider>
    );

    fireEvent.press(screen.getByText('Create Beneficiary'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('CreateBeneficiary');
  })

})
