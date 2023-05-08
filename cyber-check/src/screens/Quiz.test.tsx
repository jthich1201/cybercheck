import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Quiz from "../constants/Quiz";

describe("Quiz component", () => {
  it("renders the first question", () => {
    const { getByText } = render(<Quiz />);
    expect(getByText("Question 1")).toBeTruthy();
  });

  it("shows the next button after answering the first question", () => {
    const { getByText } = render(<Quiz />);
    fireEvent.press(getByText("Option A"));
    expect(getByText("Next")).toBeTruthy();
  });

  it("shows the modal after completing the quiz", () => {
    const { getByText } = render(<Quiz />);
    fireEvent.press(getByText("Option A"));
    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Option B"));
    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Option C"));
    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Option D"));
    fireEvent.press(getByText("Finish"));
    expect(getByText("Quiz completed!")).toBeTruthy();
  });
});