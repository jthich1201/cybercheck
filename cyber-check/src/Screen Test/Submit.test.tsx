import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Submit from "../screens/Submit.tsx";

describe("<Submit />", () => {
  test("renders Submit component correctly", () => {
    const { getByText, getByTestId } = render(<Submit navigation={undefined} route={undefined} />);
    const header = getByText("Submit Report");
    const input = getByTestId("description-input");
    const submitButton = getByText("Submit");

    expect(header).toBeDefined();
    expect(input).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  test("updates description state when input is changed", () => {
    const { getByTestId } = render(<Submit />);
    const input = getByTestId("description-input");

    fireEvent.changeText(input, "test description");

    expect(input.props.value).toBe("test description");
  });

  test("navigates to RecentReportsTab when submit button is pressed", () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByText } = render(<Submit navigation={navigation} />);
    const submitButton = getByText("Submit");

    fireEvent.press(submitButton);

    expect(navigation.navigate).toHaveBeenCalledWith("RecentReportsTab", { reportName: "" });
  });
});
