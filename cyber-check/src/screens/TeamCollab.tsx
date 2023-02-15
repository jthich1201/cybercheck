import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Teams } from "../constants/Teams";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { Members } from "../constants/Members";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/*
the view display title "add collaborators" on top
display a dropdown to select a team and display a dropdown
to add additional members.
users should be able to move the next/previous page
(two buttons left and right?)
*/
type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const TeamCollab = ({ route, navigation }: Props) => {
  let { reportName } = route.params;
  const [selectedTeam, setTeam] = useState({});
  const [selectedMembers, setMembers] = useState([]);
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
        <Pressable onPress={() => navigation.navigate("SelectIncident")}>
          <Icon name="arrow-back-ios" type="material"></Icon>
        </Pressable>
        <Text style={styles.header}>Add{"\n"}Collaborators</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Quiz", { reportName });
          }}
        >
          <Icon name="arrow-forward-ios" type="material" color="black"></Icon>
        </Pressable>
      </View>
      <View style={styles.incidentContainer}>
        <Text style={styles.incidentText}>Add Team</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          data={Teams}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Select team..."
          searchPlaceholder="Search..."
          value={selectedTeam}
          onChange={(item) => {
            setTeam(item.id);
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: windowHeight * 0.05,
          marginBottom: windowHeight * 0.05,
        }}
      >
        <Text style={styles.incidentText}>Or</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.incidentText}>Add Additional Members</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          data={Members}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Select members..."
          searchPlaceholder="Search..."
          value={selectedMembers}
          onChange={(item) => {
            setMembers(item);
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={styles.button}
            onPress={() => {
              console.log(
                "added team: " +
                  selectedTeam +
                  "added members: " +
                  selectedMembers
              );
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
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
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    boxShadow: "20px 20px 205px red",
    elevation: 4,
    width: windowWidth * 0.25,
    height: 50,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: windowHeight * 0.1,
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
    border: "1px solid black",
    paddingTop: 15,
  },
  dropdownText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TeamCollab;