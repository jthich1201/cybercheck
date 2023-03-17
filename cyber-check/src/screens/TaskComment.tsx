import React, { useState } from "react";
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

type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TaskComment = ({ navigation, route }: Props) => {
  let { reportName } = route.params;
  let { task } = route.params;
  const [inputText, setInputText] = useState("");
  const [commentText, setCommentText] = useState("");

  const submitComment = async () => {
    const comment = commentText.trim();
    if (!comment) {
      return;
    }

    try {
      const response = await fetch("http://192.168.1.3:3000/api/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        comment: comment 
        }),
      });
      const result = await response.json();
      // handle response
      console.log(result);
    } catch (error) {
      // handle error
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
        <Pressable style={styles.button} onPress={submitComment}>
            <Text style={styles.buttonText}>Add Comments</Text>
          </Pressable>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.taskName}>{task.TaskName}</Text>
        </View>
        <TextInput
          multiline={true}
          style={styles.description}
          onChangeText={(description) => setInputText(description)}
          placeholder="Description..."
          value={inputText}
        />
        <Text style={styles.taskName}>
          Completed by: Billy {"\n"} On Feb 10, 2023
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.comment}
          onChangeText={(Comment) => setCommentText(Comment)}
          placeholder="comments..."
          value={commentText}
        />
        <View style={{}}>
          <Pressable
            style={styles.button}
            onPress={() => {
              //post request to add comments
              console.log(commentText);
            }}
          >
            <Text style={styles.buttonText}> Add Comments</Text>
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
