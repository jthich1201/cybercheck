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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const SelectIncident = ({ navigation }: Props) => {
  const [selectedIncident, setSelectedIncident] = useState(-1);
  const [reportName, setReportName] = useState("");

  const getSelectedIncident = (selectedIncident: number) => {
    return selectedIncident != -1
      ? IncidentOptions[selectedIncident].label
      : "Null";
  };

  useEffect(() => {
    const setName = async (value: string) => {
      try {
        await AsyncStorage.setItem("selectedIncident", value);
      } catch (e) {
        console.log(e);
      }
    };
    if (selectedIncident != -1) {
      console.log("reached");
      let incident = getSelectedIncident(selectedIncident);
      console.log(incident);
      setName(JSON.stringify(incident));
    }
  }, [selectedIncident]);

  const createReport = async () => {
    axios
      .post("http//localhost:3001/Reports/createReport", {
        selectedIncident: getSelectedIncident(selectedIncident),
        name: reportName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
