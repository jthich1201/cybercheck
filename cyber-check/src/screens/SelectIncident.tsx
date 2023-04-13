import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IncidentOptions } from "../constants/IncidentOptions";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "@rneui/base";
import { scale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Report } from "../types/Report";
import { getUser } from "../hooks/getUser";
import { v4 as uuidv4 } from "uuid";
import { getIpAddress } from "../hooks/getIpAddress";
import { IncidentResponse } from "../types/Prompts";
//import { IncidentResponse } from "../types/IncidentResponse";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const SelectIncident = ({ navigation }: Props) => {
  const [selectedIncident, setSelectedIncident] = useState(-1);
  const [reportName, setReportName] = useState("");
  const ipAddress = getIpAddress();
  const getSelectedIncident = (selectedIncident: number) => {
    return selectedIncident != -1
      ? IncidentOptions[selectedIncident].label
      : "Null";
  };

  const user = getUser();

  useEffect(() => {
    const setName = async (value: string) => {
      try {
        await AsyncStorage.setItem("selectedIncident", value);
        await AsyncStorage.setItem("reportName", reportName);
      } catch (e) {
        console.log(e);
      }
    };
    if (selectedIncident != -1) {
      console.log("reached");
      let incident = getSelectedIncident(selectedIncident);
      setName(JSON.stringify(incident));
      getIncidentResponse();
    }
  }, [selectedIncident, reportName]);

  const getIncidentResponse = async () => {
    const url = `http://${ipAddress}:3001/Prompts/getIncidentResponses`;
    try {
      const response = await axios.get(url);
      const incidentResponses: IncidentResponse[] = response.data;
      console.log(incidentResponses);
      const match = incidentResponses.filter((incidentResponse) => {
        return getSelectedIncident(selectedIncident).includes(
          incidentResponse.incident_type
        );
      });
      console.log(match);
      await AsyncStorage.setItem("incidentResponse", JSON.stringify(match[0])); // store incident responses in async storage
    } catch (error) {
      console.log(error);
    }
  };

  const createReport = async () => {
    const url = `http://${ipAddress}:3001/Reports/createReport`;
    var userId = uuidv4();
    if (user) userId = user.userId;
    console.log(userId);
    const report = {
      title: reportName,
      creator: userId,
      type: getSelectedIncident(selectedIncident),
      status: "Draft",
      orgId: "cfd7a2b8-c2c8-11ed-afa1-0242ac120002",
      groupId: "4ca004d4-c2b5-11ed-afa1-0242ac120002",
    };
    try {
      const res = await axios.post(url, report);
      const reportData = res.data[0];
      console.log(reportData);
      const createdReport: Report = {
        reportId: reportData.report_id,
        title: reportData.title,
        creator: reportData.creator,
        createdAt: reportData.created_at,
        type: reportData.type,
        status: reportData.status,
        orgId: reportData.org_id,
        groupId: reportData.group_id,
        updatedAt: reportData.updated_at,
      };
      console.log(createdReport);
      await AsyncStorage.setItem("report", JSON.stringify(createdReport));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.navigate("RecentReportsTab")}>
          <Icon name="arrow-back-ios" type="material"></Icon>
        </Pressable>
        <Text style={styles.header}>Create New{"\n"}Report</Text>
        <Pressable
          onPress={() => {
            console.log(reportName);
            createReport();
            navigation.navigate("TeamCollab", { reportName });
          }}
          disabled={selectedIncident == -1 ? true : false}
        >
          <Icon
            name="arrow-forward-ios"
            type="material"
            color={selectedIncident == -1 ? "white" : "black"}
          ></Icon>
        </Pressable>
      </View>
      <View style={styles.incidentContainer}>
        <Text style={styles.incidentText}>Incident Type</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          data={IncidentOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={selectedIncident}
          onChange={(item) => {
            setSelectedIncident(item.value);
          }}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(input) => setReportName(input)}
          placeholder="Enter Report Name"
          value={reportName}
        ></TextInput>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  header: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  incidentContainer: {
    alignItems: "center",
    marginTop: windowHeight * 0.1,
  },
  incidentText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  dropdown: {
    marginTop: 15,
    height: 50,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    padding: 10,
    borderRadius: 10,
  },
  dropdownContainer: {
    minWidth: windowWidth * 0.8,
    alignSelf: "center",
    paddingTop: 15,
  },
  dropdownText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginTop: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: windowWidth * 0.8,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
});
export default SelectIncident;
