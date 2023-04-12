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

export default function App() {
  let [name, setName] = useState("");
  let [reportName, setReportName] = useState("");
  const [incidentType, setIncidentType] = useState("");

  useEffect(() => {
    const getReport = async () => {
      const incident = await AsyncStorage.getItem("selectedIncident");
      setIncidentType(incident ? incident : "No Incident Selected");
      const reportName = await AsyncStorage.getItem("reportName");
      setReportName(reportName ? reportName : "No Report Name");
    };
    getReport();
  }, []);

  const user = getUser();

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
	  <title>My Report</title>
  </head>
  <body>
	  <h1>${reportName}</h1>
    <h2>${incidentType}</h2>
	  <p>Reporter: ${user?.name}</p>
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
