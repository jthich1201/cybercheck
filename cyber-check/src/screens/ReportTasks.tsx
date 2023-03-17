import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { TaskList } from "../constants/taskList";
import reportPromptList from "../constants/reportPrompts.json";
import Checkbox from "../components/Checkbox";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SaveAndSharePDF from "../utils/pdfExport.js";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

type Prompt = {
  id: number;
  text: string;
};

const ReportTasks = ({ route, navigation }: Props) => {
  let { reportName } = route.params;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(TaskList.length);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [reportPrompts, setReportPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const getSelectedIncident = async () => {
      try {
        const value = await AsyncStorage.getItem("selectedIncident");
        console.log("executing getSelectedIncident");
        if (value !== null) {
          setSelectedIncident(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getSelectedIncident();
  }, []);

  useEffect(() => {
    const setPrompts = () => {
      let prompts = reportPromptList.incidentReponse[0].prompts;
      const arr = Object.entries(prompts).map(([id, text]) => ({
        id: parseInt(id),
        text,
      }));
      if (reportPrompts != arr) setReportPrompts(arr);
    };
    setPrompts();
  }, [selectedIncident]);

  //Need to change this so it uses initialized tasks (OD-103) and update status of tasks once they are completed
  const getCheckboxStatus = (checked: boolean, taskId: number): void => {
    console.log(`checked: ${!checked}, taskId: ${taskId}`);
    TaskList.find((task) => {
      if (task.TaskId === taskId) {
        task.TaskStatus = !checked ? "Completed" : "Pending";
        if (!checked) {
          if (completedTasks <= 4) {
            setCompletedTasks(completedTasks + 1);
          }
          if (remainingTasks >= 0) {
            setRemainingTasks(remainingTasks - 1);
          }
        } else {
          if (completedTasks >= 0) {
            setCompletedTasks(completedTasks - 1);
          }
          if (remainingTasks <= 4) {
            setRemainingTasks(remainingTasks + 1);
          }
        }
      }
    });
  };

  return (
    <>
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
            onPress={() => navigation.navigate("Quiz", { reportName })}
          >
            <Icon name="arrow-back-ios" type="material"></Icon>
          </Pressable>
          <Text style={styles.header}>{reportName}</Text>
          { <Pressable onPress={() => navigation.navigate("")} disabled={true}>
            <Icon name="arrow-forward-ios" type="material"></Icon>
          </Pressable> }
           <SaveAndSharePDF />
        </View>
        <View style={styles.tasksContainer}>
          <FlatList
            data={reportPrompts}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.taskContainer}>
                <Checkbox
                  getCheckboxStatus={getCheckboxStatus}
                  taskId={item.id}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TaskDescription", {
                      reportName,
                      item,
                    })
                  }
                  onLongPress={() =>
                    navigation.navigate("TaskComment", {
                      reportName,
                      item,
                    })
                  }
                  style={styles.taskTextContainer}
                >
                  <Text style={styles.taskText}>
                    {item.text.substring(0, 70) + "..."}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
      <View style={styles.taskCountContainer}>
        <View style={styles.taskCount}>
          <Text style={styles.taskCountText}>
            Remaining Tasks: {remainingTasks}
          </Text>
        </View>
        <View style={styles.taskCount}>
          <Text style={styles.taskCountText}>
            Completed Tasks: {completedTasks}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 7,
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
  tasksContainer: {
    // marginTop: 20,
    flex: 1,
    // overflow: "scroll",
    padding: scale(16),
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(8),
    margin: 10,
  },
  taskTextContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    marginLeft: scale(16),
  },
  dropdown: {
    marginTop: 15,
    height: 50,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    padding: 10,
    borderRadius: 10,
  },
  taskText: {
    fontWeight: "bold",
    padding: 15,
    fontSize: scale(16),
  },
  taskCountContainer: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
  },
  taskCount: {
    flex: 1,
    maxHeight: "100%",
    Width: "100%",
  },
  taskCountText: {
    textAlign: "center",
    fontSize: scale(25),
    fontWeight: "bold",
    overflowWrap: "break-word",
    wordWrap: "break-word",
  },
});

export default ReportTasks;
