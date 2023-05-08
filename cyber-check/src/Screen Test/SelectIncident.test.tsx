import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SelectIncident from "../SelectIncident";

// mock AsyncStorage functions
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("SelectIncident", () => {
  test("renders the header and incident type text", () => {
    const { getByText } = render(<SelectIncident />);
    expect(getByText("Create New\nReport")).toBeDefined();
    expect(getByText("Incident Type")).toBeDefined();
  });

  test("selects an incident and creates a report on press of the arrow button", async () => {
    const { getByTestId, getByPlaceholderText } = render(<SelectIncident />);
    const dropdown = getByTestId("incident-dropdown");
    const reportNameInput = getByPlaceholderText("Enter report name");

    // select the first incident option
    fireEvent(dropdown, "valueChange", 0);

    // enter report name
    fireEvent.changeText(reportNameInput, "My Report");

    // click the arrow button
    fireEvent.press(getByTestId("arrow-button"));
  });

  test("disables the arrow button when no incident is selected", () => {
    const { getByTestId } = render(<SelectIncident />);
    const arrowButton = getByTestId("arrow-button");

    // check that the arrow button is disabled initially
    expect(arrowButton.props.disabled).toBe(true);

    // select an incident option
    fireEvent(getByTestId("incident-dropdown"), "valueChange", 0);

    // check that the arrow button is enabled now
    expect(arrowButton.props.disabled).toBe(false);
  });
});