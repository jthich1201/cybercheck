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
import { ReportPrompts } from "../constants/reportPrompts";
import Checkbox from "../components/Checkbox";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveAndSharePDF from "../utils/pdfExport";
import { Task } from "../types/Tasks";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "../hooks/getUser";
import { getReport } from "../hooks/getReport";

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
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [reportPrompts, setReportPrompts] = useState<Prompt[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const user = getUser();

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
    createTasks();
  }, []);

  const getCheckboxStatus = (checked: boolean, taskId: string): void => {
    console.log(`checked: ${checked}, taskId: ${taskId}`);
    tasks.find((task) => {
      if (task.taskId === taskId) {
        console.log(checked);
        task.completed = checked ? true : false;
        if (checked) {
          setCompletedTasks(completedTasks + 1);
          setRemainingTasks(remainingTasks - 1);
        } else {
          setCompletedTasks(completedTasks - 1);
          setRemainingTasks(remainingTasks + 1);
        }
      }
    });
  };

  const createTasks = async () => {
    //create Task objects from reportPrompts
    let tasks: Task[] = [];
    if (user) var name = user.name;
    ReportPrompts.incidentReponse[0].prompts?.forEach((prompt) => {
      let task: Task = {
        taskId: uuidv4(),
        title: prompt.text,
        assignee: name,
        createdAt: new Date(),
        updatedAt: new Date(),
        reportId: uuidv4(),
        completed: false,
      };
      tasks.push(task);
    });
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    setTasks(tasks);
    setRemainingTasks(tasks.length);
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
            onPress={() => navigation.navigate("RecentReportsTab", { reportName })}
          >
            <Icon name="arrow-back-ios" type="material"></Icon>
          </Pressable>
          <Text style={styles.header}>{reportName}</Text>
          <SaveAndSharePDF />
        </View>
        <View style={styles.tasksContainer}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <View key={item.taskId} style={styles.taskContainer}>
                <Checkbox
                  getCheckboxStatus={getCheckboxStatus}
                  taskId={item.taskId}
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
                    {item.title.substring(0, 70) + "..."}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.taskId.toString()}
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
    flex: 1,
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
