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
  ActivityIndicator,
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
import { getIpAddress } from "../hooks/getIpAddress";
import axios from "axios";
import { IncidentResponse, Prompt } from "../types/Prompts";
import { Report } from "../types/Report";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const ReportTasks = ({ route, navigation }: Props) => {
  let { reportName } = route.params;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ipAddress, setIpAddress] = useState("");
  const user = getUser();

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
    if (ipAddress) createTasks();
  }, [ipAddress]);

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

  const getPrompts = async () => {
    console.log("getting porompts");
    try {
      const data = await AsyncStorage.getItem("incidentResponse");
      if (data == null) return;
      const incidentResponse: IncidentResponse = JSON.parse(data);
      // console.log(incidentResponse);
      const url = `http://${ipAddress}:3001/Prompts/getPrompts/${incidentResponse.id}`;
      const response = await axios.get(url);
      const prompts: Prompt[] = response.data.rows;
      let severity = await AsyncStorage.getItem("severityLevel");
      if (severity == null) return;
      const filteredPrompts = prompts.filter((prompt) => {
        return prompt.severity === severity;
      });
      setPrompts(filteredPrompts);
      return filteredPrompts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const createTasks = async () => {
    const fPrompts = await getPrompts();
    console.log("Creating tasks");
    const report = await AsyncStorage.getItem("report");
    if (report == null) return;
    const reportObj: Report = JSON.parse(report);
    if (user) var name = user.name;
    let taskObj: Task[] = [];
    for (const prompt of fPrompts!) {
      let tempTask: Task = {
        taskId: uuidv4(),
        title: prompt.title,
        taskDescription: prompt.description,
        assignee: name,
        createdAt: new Date(),
        updatedAt: new Date(),
        reportId: reportObj.report_id,
        completed: false,
      };
      taskObj.push(tempTask);
    }
    setTasks(taskObj);
    await AsyncStorage.setItem("tasks", JSON.stringify(taskObj));
    setRemainingTasks(taskObj.length);
    setIsLoading(false);
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
            onPress={() =>
              navigation.navigate("RecentReportsTab", { reportName })
            }
          >
            <Icon name="arrow-back-ios" type="material"></Icon>
          </Pressable>
          <Text style={styles.header}>{reportName}</Text>
          <SaveAndSharePDF />
        </View>
        <View style={styles.tasksContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                    <Text style={styles.taskText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.taskId.toString()}
            />
          )}
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
