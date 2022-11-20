import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IncidentOptions } from "../constants/IncidentOptions";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "@rneui/base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const SelectIncident = ({ navigation }: Props) => {
  const [selectedIncident, setSelectedIncident] = useState(0);

  const getSelectedIncident = (selectedIncident: number) => {
    return IncidentOptions[selectedIncident].label;
  };

  console.log(getSelectedIncident(selectedIncident));

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
        <Pressable onPress={() => navigation.navigate("Quiz")}>
          <Icon name="arrow-forward-ios" type="material"></Icon>
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
});

export default SelectIncident;
