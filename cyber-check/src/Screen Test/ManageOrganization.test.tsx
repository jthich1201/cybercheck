import React from "react";
import { render } from "@testing-library/react-native";
import ManageOrganization from "./ManageOrganization";

describe("ManageOrganization", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<ManageOrganization />);
    expect(getByTestId("container")).toBeDefined();
  });
});