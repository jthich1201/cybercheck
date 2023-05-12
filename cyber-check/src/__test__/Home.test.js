import React from "react";
import { render } from "@testing-library/react-native";
import Home from "../screens/Home";

jest.mock("../hooks/getUser", () => {
  return {
    getUser: jest.fn(() => {
      return { name: "John Doe", email: "johndoe@example.com" };
    }),
  };
});

describe("Home screen", () => {
  it("renders correctly when user is logged in", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Welcome John Doe")).toBeDefined();
    expect(getByText("johndoe@example.com")).toBeDefined();
  });

  it("renders correctly when user is not logged in", () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      })
    );

    const { getByText } = render(<Home />);
    expect(getByText("Welcome")).toBeDefined();
    expect(getByText("Please log in to continue.")).toBeDefined();
  });
});