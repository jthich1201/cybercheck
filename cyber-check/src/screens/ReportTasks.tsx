import React, { useState } from "react";
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
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { TaskList } from "../constants/taskList";
import Checkbox from "../components/Checkbox";
import { scale } from "react-native-size-matters";
import { Task } from "../types/Tasks";
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";

import SaveAndSharePDF from "../utils/pdfExport";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

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

  const printTaskList = () => {
    for (let task of TaskList) {
      console.log(`TaskId: ${task.TaskId}, TaskStatus: ${task.TaskStatus}`);
    }
  };

  const createTasks = async() => {
    //create Task objects from reportPrompts
    let tasks: Task[] = [];
    reportPrompts.forEach((prompt) => {
      let task: Task = {
        taskId: uuidv4(),
        title: prompt.text,
        assignee: 'me',
        createdAt: new Date(),
        updatedAt: new Date(),
        reportId: uuidv4(),
        completed: false
      };
      tasks.push(task);
    });
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

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
          <SaveAndSharePDF />
        </View>
        <View style={styles.tasksContainer}>
          {TaskList.map((task) => {
            return (
              <View key={task.TaskId} style={styles.taskContainer}>
                <Checkbox
                  getCheckboxStatus={getCheckboxStatus}
                  taskId={task.TaskId}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TaskComment", {
                      reportName,
                      task,
                    })
                  }
                  style={styles.taskTextContainer}
                >
                  <Text style={styles.taskText}>{task.TaskName}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
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
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  taskTextContainer: {
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
  dropdown: {
    marginTop: 15,
    height: 50,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    padding: 10,
    borderRadius: 10,
  },
  taskText: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 15,
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
