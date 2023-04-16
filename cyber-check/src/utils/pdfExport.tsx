import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../hooks/getUser";
import React from "react";
import { Icon } from "@rneui/base";
import { Report } from "../types/Report";
import { getIpAddress } from "../hooks/getIpAddress";
import axios from "axios";
import { getReport } from "../hooks/getReport";

export default function App() {
  const [name, setName] = useState("");
  const [report, setReport] = useState<Report>();
  const ipAddress = getIpAddress();
  const reportId = getReport();

  useEffect(() => {
    if (reportId) {
      getSelectedReport(reportId);
    } else {
      console.log("noid");
    }
  }, [reportId]);

  const getSelectedReport = async (data: any) => {
    const url = `http://${ipAddress}:3001/Reports/getSelectedReport/${data}`;
    console.log("attempting report gather");
    axios
      .get(url, {})
      .then((res) => {
        console.log("report was gathered with success");
        console.log(res.data[0]);
        setReport(res.data[0]);
      })
      .catch((err) => {
        console.log("pdf creation error");
        console.log(err);
      });
  };

  const user = getUser();

  const html =
    report &&
    `
  <!DOCTYPE html>
  <html>
  <head>
	  <title>My Report</title>
  </head>
  <body>
	  <h1>${report!.title}</h1>
    <h2>${report!.status}</h2>
    <h5>Report Id: ${report.report_id}</h5>
	  <p>Updated at: ${report!.updated_at}</p>
	  <ul>
		  <li>Item 1</li>
		  <li>Item 2</li>
		  <li>Item 3</li>
	  </ul>
  </body>
  </html>  
  <style>
	body {
		font-family: Arial, sans-serif;
		color: #333;
	}
	
	h1 {
		color: #0066CC;
	}
	
	ul {
		list-style-type: disc;
		margin-left: 20px;
	}
</style>
`;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <Pressable onPress={generatePdf}>
      <Icon name="ios-share" type="material"></Icon>
    </Pressable>
  );
}
