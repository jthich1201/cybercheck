import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ReportTasks from "../screens/ReportTasks";

describe("ReportTasks", () => {
  it("should render the ReportTasks screen", () => {
    const { getByTestId } = render(<ReportTasks />);
    const reportTasksScreen = getByTestId("report-tasks-screen");
    expect(reportTasksScreen).toBeDefined();
  });

  it("should show the correct number of remaining tasks", () => {
    const { getByTestId } = render(<ReportTasks />);
    const remainingTasksText = getByTestId("remaining-tasks-text");
    expect(remainingTasksText).toHaveTextContent("Remaining Tasks: 0");
  });

  it("should show the correct number of completed tasks", () => {
    const { getByTestId } = render(<ReportTasks />);
    const completedTasksText = getByTestId("completed-tasks-text");
    expect(completedTasksText).toHaveTextContent("Completed Tasks: 0");
  });

  it("should change the number of remaining and completed tasks when a checkbox is checked", () => {
    const { getByTestId } = render(<ReportTasks />);
    const checkbox = getByTestId("checkbox-1");
    const remainingTasksText = getByTestId("remaining-tasks-text");
    const completedTasksText = getByTestId("completed-tasks-text");

    fireEvent.press(checkbox);
    expect(remainingTasksText).toHaveTextContent("Remaining Tasks: 2");
    expect(completedTasksText).toHaveTextContent("Completed Tasks: 1");
  });
});