import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { getUser } from "../hooks/getUser";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Description } from "../types/Tasks";


type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TaskComment = ({ navigation, route }: Props) => {
  let { reportName } = route.params;
  let { item } = route.params;
  const [commentText, setCommentText] = useState("");
  const [description, setDescription] = useState("");
  const [completedDate, setCompletedDate] = useState("");
  const [completedUser, setCompletedUser] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [inputText, setInputText] = useState("");
  let currentUser = getUser();

  useEffect(() => {
    const getIp = async () => {
      try {
        const value = await AsyncStorage.getItem("ipAddress");
        if (value !== null) {
          setIpAddress(JSON.parse(value));
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };
    getIp();
  }, []);

  useEffect(() => {
    if (ipAddress) fetchDescription();
  }, [ipAddress]);

  const fetchDescription = async () => {
    try {
      console.log(item.task_id);
      const url = `http://${ipAddress}:3001/api/descriptions?task_id={${item.task_id}}`;
  
      const res = await axios.get(url);
      const currentDescription: Description = res.data;
      console.log("description:", currentDescription);

      setDescription(currentDescription?.description);
      setCompletedDate(currentDescription?.date_time);
      setCompletedUser(currentDescription?.name);
      console.log("description:", description);
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    
    const comment = commentText.trim();
    console.log("comment: ", comment);
    console.log("task_id: ", item.task_id);
    console.log("user_id: ", currentUser?.userId);
    console.log("ipAddress: ", ipAddress);
    if (!comment) {
      return;
    }
    try {
      const response = await axios.post(`http://${ipAddress}:3001/api/comments`, 
      {
        comment: comment,
        user_id: currentUser?.userId,
        task_id: item.task_id,
      },
      {       
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("comments response data",response.data);
    } catch (error) {
      console.log("error: ",error);
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
        <Pressable
          onPress={() => navigation.navigate("Submit", { reportName })}
        >
          <Icon name="arrow-forward-ios" type="material"></Icon>
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.taskName}>{item.title}</Text>
        </View>
        <TextInput
          multiline={true}
          style={styles.description}
          onChangeText={(description) => setInputText(description)}
          value={description}
          editable={false}
        />
        <Text style={styles.taskName}>
          Completed by: {completedUser} {"\n"} On{" "}
          {new Date(completedDate).toLocaleDateString()}
        </Text>
        <View style={{}}>
          <Pressable style={styles.button} onPress={submitComment}>
            <Text style={styles.buttonText}>Add Comments</Text>
          </Pressable>
        </View>

        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.comment}
          onChangeText={(Comment) => setCommentText(Comment)}
          placeholder="comments..."
          value={commentText}
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
  contentContainer: {
    alignItems: "center",
    minWidth: windowWidth * 0.8,
    border: "1px solid black",
  },
  taskName: {
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center",
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
  description: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: windowWidth * 0.8,
    minHeight: windowHeight * 0.3,
    maxHeight: windowHeight * 0.4,
    fontSize: 20,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
  comment: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: windowWidth * 0.8,
    minHeight: windowHeight * 0.2,
    maxHeight: windowHeight * 0.3,
    fontSize: 20,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
});

export default TaskComment;
