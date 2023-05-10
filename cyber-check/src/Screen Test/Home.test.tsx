import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Home from "./Home";
import { getUser } from "../hooks/getUser";
import { User } from "../types/User";

jest.mock("../hooks/getUser"); // Mock the getUser function

describe("Home component", () => {
  it("renders the user's name and email when currentUser is truthy", async () => {
    const currentUser: User = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    getUser.mockReturnValueOnce(currentUser); // Set the mock return value

    const { getByText } = render(<Home />);

    // Wait for the component to render the user data
    await waitFor(() => {
      expect(getByText(Welcome ${currentUser.name})).toBeTruthy();
      expect(getByText(currentUser.email)).toBeTruthy();
    });
  });

  it("does not render user data when currentUser is falsy", async () => {
    getUser.mockReturnValueOnce(null); // Set the mock return value

    const { queryByText } = render(<Home />);

    // Wait for the component to render
    await waitFor(() => {
      expect(queryByText("Welcome")).toBeNull();
      expect(queryByText("")).toBeNull();
    });
  });
});