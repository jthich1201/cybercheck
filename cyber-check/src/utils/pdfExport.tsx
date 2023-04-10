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

export default function App() {
  let [name, setName] = useState("");
  let [reportName, setReportName] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const ipAddress = getIpAddress();  
  let reportId = AsyncStorage.getItem("reportId");
  var report: Report[] = [];
  useEffect(() => {
    const getReport = async () => {
      getSelectedReport(reportId);
    };
    getReport();
  }, []);
  const getSelectedReport = async (data: any) => {
    const url = `http://${ipAddress}:3001/Reports/getSelectedReport/2ee62d6e-53e4-4b05-8884-a57429e0b191`;
    console.log("attempting report gather");
    axios
      .get(url, {})
      .then((res) => {
        console.log("report was gathered with success");
        report = res.data;
      })
      .catch((err) => {
        console.log("pdf creation error");
        console.log(err);
      });
  };

  const user = getUser();

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
	  <title>My Report</title>
  </head>
  <body>
	  <h1>${report[0].title}</h1>
    <h2>${report[0].status}</h2>
	  <p>Reporter: ${report[0].updatedAt}</p>
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
    <View style={styles.container}>
      {
        <Pressable onPress={generatePdf}>
          <Icon name="ios-share" type="material"></Icon>
        </Pressable>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
