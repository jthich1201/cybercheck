import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignIn from "./SignIn";

describe("SignIn", () => {
  it("should sign in with Google successfully", async () => {
    // Render the SignIn component
    const { getByTestId } = render(<SignIn />);

    // Click the Google sign in button
    const googleButton = getByTestId("google-signin-button");
    fireEvent.press(googleButton);

    // Wait for the user's information to be displayed
    await waitFor(() => {
      const userInfo = getByTestId("user-info");
      expect(userInfo).toBeTruthy();
    });
  });

  it("should sign in with Azure AD successfully", async () => {
    // Render the SignIn component
    const { getByTestId } = render(<SignIn />);

    // Click the Azure AD sign in button
    const azureButton = getByTestId("azure-signin-button");
    fireEvent.press(azureButton);

    // Wait for the user's information to be displayed
    await waitFor(() => {
      const userInfo = getByTestId("user-info");
      expect(userInfo).toBeTruthy();
    });
  });

  it("should prompt user to refresh token when token is expired", async () => {
    // Mock the persisted auth data to simulate an expired token
    const mockAuthData = {
      accessToken: "mockToken",
      expiresIn: 0,
      issuedAt: new Date().getTime() / 1000 - 7200, // issued 2 hours ago
    };
    jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(mockAuthData));

    // Render the SignIn component
    const { getByTestId } = render(<SignIn />);

    // Wait for the user to be prompted to refresh token
    await waitFor(() => {
      const refreshTokenButton = getByTestId("refresh-token-button");
      expect(refreshTokenButton).toBeTruthy();
    });
  });

  it("should prompt user to sign in again when token is invalid", async () => {
    // Mock the persisted auth data to simulate an invalid token
    const mockAuthData = {
      accessToken: "mockToken",
      expiresIn: 3600,
      issuedAt: new Date().getTime() / 1000,
    };
    jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(mockAuthData));

    // Render the SignIn component
    const { getByTestId } = render(<SignIn />);

    // Wait for the user to be prompted to sign in again
    await waitFor(() => {
      const signInButton = getByTestId("sign-in-button");
      expect(signInButton).toBeTruthy();
    });
  });
});
