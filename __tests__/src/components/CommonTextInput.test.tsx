import { describe, it, expect } from "@jest/globals"
import { render } from "@testing-library/react-native"
import { TextInput } from "react-native"
import { CommonTextInput } from "../../../src/components/CommonTextInput"

describe('CommonTextInput', () => {

  it('should render correctly', () => {
    const {toJSON} = render(<CommonTextInput />);
    expect(toJSON()).toMatchSnapshot();
    });

  it('should render input with correct text', () => {
    const { getByTestId } = render(
      <CommonTextInput placeholder="Test" testID="test-input" />,
    )
    const input = getByTestId('test-input') as unknown as TextInput
    expect(input.props.placeholder).toBe('Test')
  })
})
