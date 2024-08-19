import { describe, it, expect } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { CurrentBalanceCard } from "../../../src/components/CurrentBalanceCard";

describe('CurrentBalanceCard', () => {
  it('should render correctly', () => {
    const {toJSON} = render(<CurrentBalanceCard currentBalance={123.45} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should display correct balance', () => {
    const {getByText} = render(<CurrentBalanceCard currentBalance={123.45} />);
    expect(getByText('$123.45')).toBeDefined();
  });
});
