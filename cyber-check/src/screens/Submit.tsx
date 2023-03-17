import React, { useState, useEffect } from "react";
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
import axios from "axios";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const Submit = ({ route, navigation }: Props) => {
  const [description, setDescription] = useState("");
  let { reportName } = route.params;
  let { item } = route.params;
  const [currentTime, setCurrentTime] = useState(new Date());

  const now = new Date();
  const timestamp = now.toLocaleString();

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(new Date());
         axios.post('http//localhost:3001/Users/saveUsers', { date_time: timestamp}) ///////////////////////////////////////////
         .then(response => console.log(response))
         .catch(error => console.log(error));
    }, 1000);
  return () => clearInterval(interval);
}, []);



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
      
      <Text style ={styles.commentText}>Final Submit of Changes</Text>
      <View style={{}}>
          <Pressable
            style={styles.button}
            onPress={() => {
              //post request to add timestamp to report
              console.log(timestamp);
              navigation.navigate("RecentReportsTab", { reportName });

            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        <Text>Timestamp:</Text>
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

export default Submit;
