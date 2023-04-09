import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QuestionsData } from "../constants/QuestionsData";
import { getIpAddress } from "../hooks/getIpAddress";
import { PrePrompt, PrePromptOptions, SeverityLevel } from "../types/Prompts";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("window");

const Option = (props: {
  handle: (arg0: any, arg1: any, arg2: any, arg3: any) => void;
  option: PrePromptOptions;
  questionId: any;
  optionIndex: any;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(false);
    console.log("index" + props.questionId);
  }, [props.option]);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsSelected(!isSelected);
        props.handle(
          props.option,
          props.questionId,
          props.optionIndex,
          !isSelected
        );
      }}
      style={isSelected ? styles.optionButtonSelected : styles.optionButton}
    >
      <Text style={styles.optionText}>{props.option.option_text}</Text>
    </TouchableOpacity>
  );
};

const Quiz = ({ route, navigation }: Props) => {
  let { reportName } = route.params;
  reportName = reportName.length > 0 ? reportName : "New Report";
  const [index, setIndex] = useState(0);
  const [isComplete, setComplete] = useState(false);
  const [nextQuestionId, setNextQuestionId] = useState(0);
  const [isNextButtonVisible, setNextButtonVisibility] = useState(false);
  const [prePrompts, setPrePrompts] = useState<PrePrompt[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<PrePromptOptions>();
  const [severityLevels, setSeverityLevels] = useState<SeverityLevel[]>([]);
  const [severityScore, setSeverityScore] = useState(0);
  const [selectedOptionSeverity, setSelectedOptionSeverity] = useState(0);
  const [severityLevel, setSeverityLevel] = useState<SeverityLevel>();
  const [showModal, setShowModal] = useState(false);
  const ipAddress = getIpAddress();

  useEffect(() => {
    getPrePrompts();
    getSeverityLevels();
  }, []);

  const getSeverityLevels = async () => {
    const res = await axios.get(
      `http://${ipAddress}:3001/Prompts/getSeverityLevel`
    );
    const data = res.data;
    data.sort((a: SeverityLevel, b: SeverityLevel) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    console.log(data);
    setSeverityLevels(data);
  };

  const getPrePrompts = async () => {
    const result = await axios.get(
      `http://${ipAddress}:3001/Prompts/getPrePrompt`
    );
    const prompts = result.data.rows;
    for (const prompt of prompts) {
      const options = await getPrePromptOptions(prompt.id);
      options.sort(
        (a: PrePromptOptions, b: PrePromptOptions) =>
          parseInt(a.severity_level) - parseInt(b.severity_level)
      );
      prompt.options = options;
    }
    setPrePrompts(prompts);
    console.log(prompts.length);
  };

  const getPrePromptOptions = async (id: string) => {
    try {
      const result = await axios.get(
        `http://${ipAddress}:3001/Prompts/getPrePromptOptions/${id}`
      );
      return result.data.rows;
    } catch (error) {
      console.log("preprompt options not working", error);
      return [];
    }
  };

  const handleNextPress = () => {
    if (isComplete) {
      calcSeverityScore();
      setShowModal(true);
    }
    if (nextQuestionId != -1) {
      setNextButtonVisibility(false);
      let qId = nextQuestionId + 1;
      setNextQuestionId(qId);
      setIndex(index + 1);
      setSelectedOptionIndex(-1);
      console.log("Selected Option Severity: ", selectedOptionSeverity);
      console.log("Severity Score: ", severityScore);
      console.log(severityScore + selectedOptionSeverity);
      setSeverityScore(severityScore + selectedOptionSeverity);
    }
  };
  const handlePrevPress = () => {
    if (index != 0) {
      setIndex(index - 1);
    }
    console.log(`Next question id: ${nextQuestionId} && index: ${index}`);
  };
  const handleOptionPress = (
    option: PrePromptOptions,
    questionId: any,
    optionIndex: any,
    selected: any
  ) => {
    console.log("selected" + selected);
    console.log("option", option);
    if (selected) {
      setSelectedOption(option);
      setNextButtonVisibility(true);
      console.log(option.severity_level);
      setSelectedOptionSeverity(parseInt(option.severity_level));
      if (questionId == prePrompts.length - 1) {
        setComplete(true);
      }
    } else {
      console.log("removing index: ");
      setSelectedOption(undefined);
      setComplete(false);
      selected = false;
      setNextButtonVisibility(false);
    }
  };

  const calcSeverityScore = () => {
    console.log("calculating severity score");
    const level = severityLevels.find((level) => {
      return (
        severityScore >= parseInt(level.min_score) &&
        severityScore <= parseInt(level.max_score)
      );
    });
    if (!level) return;
    setSeverityLevel(level);
  };

  const handleModalClose = async () => {
    setShowModal(false);
    await AsyncStorage.setItem("severityLevel", severityLevel!.id.toString());
    navigation.navigate("ReportTasks", { reportName });
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
          onPress={() => navigation.navigate("TeamCollab", { reportName })}
        >
          <Icon name="arrow-back-ios" type="material"></Icon>
        </Pressable>
        <Text style={styles.header}>{reportName}</Text>
        <Pressable
          onPress={() => navigation.navigate("ReportTasks", { reportName })}
          disabled={!isComplete ? true : false}
        >
          <Icon
            name="arrow-forward-ios"
            type="material"
            color={isComplete ? "black" : "white"}
          ></Icon>
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        {prePrompts.length > 0 && index <= prePrompts.length - 1 && (
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                Q. {prePrompts[index]["question"]}
              </Text>
            </View>
            <View style={styles.optionsContainer}>
              {prePrompts[index]["options"].map((option) => (
                <Option
                  key={option.id}
                  questionId={index}
                  optionIndex={prePrompts[index]["options"].indexOf(option)}
                  option={option}
                  handle={handleOptionPress}
                />
              ))}
            </View>
          </>
        )}
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Your Severity Score is {severityScore}, {"\n"} making this
                report a {severityLevel?.name} severity incident.
              </Text>
              <Text style={styles.modalText}></Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModalClose()}
              >
                <Text style={styles.textStyle}>Next</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={[
            styles.bottom,
            {
              justifyContent: index == 0 ? "flex-end" : "space-between",
            },
          ]}
        >
          {index != 0 && index <= prePrompts.length - 1 && (
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={handlePrevPress}
            >
              <Text style={styles.navigateText}>Previous</Text>
            </TouchableOpacity>
          )}
          {isNextButtonVisible && (
            <TouchableOpacity
              style={[styles.navigateButton]}
              onPress={handleNextPress}
            >
              <Text style={styles.navigateText}>
                {isComplete ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  modalContainer: {
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
  backButton: {
    paddingLeft: 15,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  optionsContainer: {
    flex: 6,
  },
  questionContainer: {
    flex: 3,
    height: height * 0.3,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
  questionText: {
    fontSize: 20,
  },
  optionButton: {
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    height: height * 0.08,
    marginVertical: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 15,
  },
  optionButtonSelected: {
    backgroundColor: "rgba(0, 122, 255, 0.50)",
    height: height * 0.08,
    marginVertical: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 15,
  },
  optionText: {
    fontSize: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: "space-between",
    paddingVerical: 15,
    flexDirection: "row",
  },
  navigateButton: {
    backgroundColor: "#007AFF",
    width: width * 0.25,
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
  },
  navigateText: {
    color: "white",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: scale(16),
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Quiz;
