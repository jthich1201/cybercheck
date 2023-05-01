import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RecentReportsTab from "./RecentReportsTab";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("axios");
jest.mock("@react-native-async-storage/async-storage");

describe("RecentReportsTab", () => {
  const reports = [
    { report_id: "1", title: "Report 1" },
    { report_id: "2", title: "Report 2" },
  ];
  const ipAddress = "127.0.0.1";

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: reports });
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(ipAddress));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the component with search bar, flat list and modal", async () => {
    const { getByTestId } = render(<RecentReportsTab />);

    const searchInput = getByTestId("searchInput");
    expect(searchInput).toBeTruthy();

    const flatList = getByTestId("flatList");
    expect(flatList).toBeTruthy();

    const modal = getByTestId("modal");
    expect(modal).toBeTruthy();
  });

  it("should display the reports in the flat list", async () => {
    const { getByText } = render(<RecentReportsTab />);

    await waitFor(() => {
      reports.forEach((report) => {
        expect(getByText(report.title)).toBeTruthy();
      });
    });
  });

  it("should show a loading indicator while loading the reports", async () => {
    axios.get.mockImplementation(() => {
      return new Promise(() => {});
    });
    const { getByTestId } = render(<RecentReportsTab />);

    const loadingIndicator = getByTestId("loadingIndicator");
    expect(loadingIndicator).toBeTruthy();
  });

  it("should update the reports when the IP address is changed", async () => {
    const newIpAddress = "192.168.0.1";
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(newIpAddress));

    const { getByText, rerender } = render(<RecentReportsTab />);

    await waitFor(() => {
      reports.forEach((report) => {
        expect(getByText(report.title)).toBeTruthy();
      });
    });

    const newReports = [
      { report_id: "3", title: "Report 3" },
      { report_id: "4", title: "Report 4" },
    ];
    axios.get.mockResolvedValue({ data: newReports });

    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(newIpAddress));
    rerender(<RecentReportsTab />);

    await waitFor(() => {
      newReports.forEach((report) => {
        expect(getByText(report.title)).toBeTruthy();
      });
    });
  });

  it("should show the report details when a report is clicked", async () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<RecentReportsTab navigation={navigation} />);

    const report = reports[0];
    const reportItem = getByText(report.title);
    fireEvent.press(reportItem);

    expect(navigation.navigate).toHaveBeenCalledWith("ReportTasks", {
      reportTitle: report.title,
    });
    expect(await AsyncStorage.setItem).toHaveBeenCalledWith(
      "reportId",
      JSON.stringify(report.report_id)
    );
  });

  it("should show the report details when a report is long pressed", async () => {
    const { getByText, getByTestId } = render(<RecentReportsTab />);

    const report = reports[0];
    const reportItem = getByText(report.title);