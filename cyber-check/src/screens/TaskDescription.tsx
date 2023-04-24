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
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { scale } from "react-native-size-matters";
import { getUser } from "../hooks/getUser";
import { getIpAddress } from "../hooks/getIpAddress";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import axios from "axios";

type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const TaskDescription = ({ route, navigation }: Props) => {
  let { reportName, item } = route.params;
  let currentUser = getUser();
  console.log(currentUser);
  const [descriptionText, setDescriptionText] = useState("");
  const [descriptionTime, setDescriptionTime] = useState("");
  const now = new Date();
  const timestamp = now.toLocaleString();
  const ipAddress = getIpAddress();
  console.log("item: ", item);

  const submitDescription = async () => {
    const description = descriptionText.trim();
    if (!description) {
      return;
    }
    try {
      
      const response = await axios.post(
        `http://${ipAddress}:3001/api/descriptions`,
        {
          description: description,
          user_id: currentUser?.userId,
          task_id: item.task_id
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTask = async () => {
    const description = descriptionText.trim();
    if (!description) {
      return;
    }
    try {
      
      const response = await axios.post(
        `http://${ipAddress}:3001/Tasks/setTaskCompleted`,
        {
          task_id: item.task_id,
          completed: true
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
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
        <Pressable
          onPress={() => navigation.navigate("ReportTasks", { reportName })}
        >
          <Icon name="arrow-back-ios" type="material"></Icon>
        </Pressable>
        <Text style={styles.header}>{reportName}</Text>
        <Pressable onPress={() => navigation.navigate("")} disabled={true}>
          <Icon name="arrow-forward-ios" type="material"></Icon>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>{item.task_description}</Text>
        </View>
        <TextInput
          multiline
          placeholder="Enter Description"
          style={styles.input}
          onChangeText={(input) => setDescriptionText(input)}
          value={descriptionText}
        />
        <View style={{}}>
        <Pressable style={styles.button} onPress={() => {
          navigation.navigate("ReportTasks", { reportName, completedTaskBool: true });
          submitDescription();
          completedTask();
        }}>
  <Text style={styles.buttonText}>Add Description</Text>
</Pressable>
          <Text>{timestamp}</Text>

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
  contentContainer: {
    alignItems: "center",
    minWidth: windowWidth * 0.8,
    border: "1px solid black",
  },
  commentContainer: {
    alignItems: "center",
    marginTop: windowHeight * 0.02,
  },
  commentText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    padding: scale(10),
    fontSize: scale(16),
  },
  input: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: windowWidth * 0.8,
    minHeight: windowHeight * 0.4,
    maxHeight: windowHeight * 0.6,
    fontSize: 20,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    boxShadow: "20px 20px 205px red",
    elevation: 4,
    width: windowWidth * 0.8,
    height: 50,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: windowHeight * 0.07,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TaskDescription;
