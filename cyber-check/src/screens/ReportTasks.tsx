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
import Checkbox from "../components/Checkbox";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveAndSharePDF from "../utils/pdfExport";
import { Task } from "../types/Tasks";
import "react-native-get-random-values";
import { getUser } from "../hooks/getUser";
import axios from "axios";
import { Report } from "../types/Report";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const ReportTasks = ({ route, navigation }: Props) => {
  let { reportName } = route.params;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
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
    if (ipAddress) getTasks();
  }, [ipAddress]);

  const getCheckboxStatus = (checked: boolean, taskId: string): void => {
    console.log(`checked: ${checked}, taskId: ${taskId}`);
    tasks.find((task) => {
      if (task.task_id === taskId) {
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

  const getTasks = async () => {
  const url = `http://${ipAddress}:3001/Tasks/getTask`;
  console.log("Getting tasks");
  const report = await AsyncStorage.getItem("report");
  if (!report) {
    console.log("No report found");
    return null;
  }
  const reportObj: Report = JSON.parse(report);
  if (user) var name = user.name;
  let taskObj: Task[] = [];
  let tempTask = reportObj.report_id;
  console.log(tempTask);
  try {
    const res = await axios.get(`${url}/${tempTask}`);

    for (let i = 0; i < res.data.length; i++) {
      const task: Task = res.data[i] as Task;
      taskObj.push(task);
    }
    setTasks(taskObj);
    console.log(tasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(taskObj));
    setRemainingTasks(taskObj.length);
    setIsLoading(false);
  } 
  catch (error) {
    console.log("Error while fetching tasks:", error);
    return null;
  }
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
                <View key={item.task_id} style={styles.taskContainer}>
                  <Checkbox
                    getCheckboxStatus={getCheckboxStatus}
                    taskId={item.task_id}
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
              keyExtractor={(item) => item.task_id.toString()}
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
