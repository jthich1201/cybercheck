import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TeamCollab from "../TeamCollab";

describe("TeamCollab", () => {
  test("renders correctly", () => {
    const { getByText } = render(<TeamCollab />);
    expect(getByText("Add\nCollaborators")).toBeDefined();
    expect(getByText("Add Team")).toBeDefined();
    expect(getByText("Add Additional Members")).toBeDefined();
  });

  test("navigates to the previous screen when the back button is pressed", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(<TeamCollab navigation={{ navigate }} />);
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);
    expect(navigate).toHaveBeenCalledWith("SelectIncident");
  });

  test("navigates to the next screen when the forward button is pressed", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(<TeamCollab navigation={{ navigate }} />);
    const forwardButton = getByTestId("forward-button");
    fireEvent.press(forwardButton);
    expect(navigate).toHaveBeenCalledWith("Quiz", { reportName: undefined });
  });

  test("updates the selected team when a team is selected from the dropdown", () => {
    const { getByTestId } = render(<TeamCollab />);
    const teamDropdown = getByTestId("team-dropdown");
    fireEvent.changeText(teamDropdown, "Engineering");
    expect(teamDropdown.props.value).toEqual("Engineering");
  });

  test("updates the selected members when members are selected from the multi-select", () => {
    const { getByTestId } = render(<TeamCollab />);
    const membersMultiSelect = getByTestId("members-multiselect");
    fireEvent.changeText(membersMultiSelect, ["Alice", "Bob"]);
    expect(membersMultiSelect.props.value).toEqual(["Alice", "Bob"]);
  });
});
