import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Dimensions,
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

const { height, width } = Dimensions.get("window");

type PrePrompt = {
  id: string;
  question: string;
  options: PrePromptOptions[];
};

type PrePromptOptions = {
  id: string;
  option_text: string;
  pre_prompt_id: string;
  severity_level: string;
};

const Option = (
  { option }: { option: PrePromptOptions } 
) => {
  const [isSelected, setSelected] = useState(false);

  //   useEffect(() => {});

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!isSelected);
      }}
      style={isSelected ? styles.optionButtonSelected : styles.optionButton}
    >
      <Text style={styles.optionText}>{option.option_text}</Text>
    </TouchableOpacity>
  );
};

const Quiz = ({ route, navigation }: Props) => {
  let { reportName } = route.params;
  reportName = reportName.length > 0 ? reportName : "New Report";

  const [index, setIndex] = useState(0);
  const [isComplete, setComplete] = useState(false);
  const [nextQuestionId, setNextQuestionId] = useState(0);
  const [chosenOptions, setChosenOptions] = useState([]);
  const [isNextButtonVisible, setNextButtonVisibility] = useState(false);
  const [prePrompts, setPrePrompts] = useState<PrePrompt[]>([]);
  const ipAddress = getIpAddress();
  
  useEffect( () => {
    // Fetch pre-prompts data from API
    getPrePrompts();
  }, []);
  
  const getPrePrompts = async() => {
    const result = await axios.get(`http://${ipAddress}:3001/Prompts/getPrePrompt`);
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
    console.log(prompts);
  }

  const getPrePromptOptions = async(id : string) => {
    try {
      const result = await axios.get(`http://${ipAddress}:3001/Prompts/getPrePromptOptions/${id}`)
      return result.data.rows;
    } catch (error) {
      console.log("preprompt options not working", error);
      return [];
    }
  }

  const handleNextPress = () => {
    if (isComplete) {
      navigation.navigate("ReportTasks", { reportName });
    }
    if (nextQuestionId != -1) {
      setNextButtonVisibility(false);
      setIndex(nextQuestionId);
    }
  };
  const handlePrevPress = () => {
    if (index != 0) {
      setIndex(index - 1);
    }
    console.log(`Next question id: ${nextQuestionId} && index: ${index}`);
  };
  const handleOptionPress = (
    option: { [x: string]: string },
    questionId: any,
    optionIndex: any,
    selecting: any
  ) => {
    console.log(selecting);

    setNextQuestionId(parseInt(option["next_question"]));
    let selectedOption = { questionId, optionIndex };
    if (selecting) {
      setChosenOptions(chosenOptions.concat(selectedOption));
      console.log(chosenOptions.concat(selectedOption));
      if (parseInt(option["next_question"]) == -1) {
        setComplete(true);
      }
      setNextButtonVisibility(true);
    } else {
      console.log("removing index: ");
      console.log(
        chosenOptions.findIndex((removedOption) => {
          return option === selectedOption;
        })
      );
      // console.log(chosenOptions.indexOf(selectedOption))

      chosenOptions.splice(
        chosenOptions.findIndex((removedOption) => {
          return option === selectedOption;
        })
      );
      // setChosenOptions(chosenOptions.filter(removedOption => removedOption !== selectedOption))
      setChosenOptions(chosenOptions);
      setComplete(false);
      // console.log(chosenOptions.filter(removedOption => removedOption !== selectedOption))
      console.log(chosenOptions);
      setNextButtonVisibility(false);
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
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Q. {prePrompts[index]["question"]}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          {prePrompts[index]["options"].map((option) => (
            <Option option={option} />
          ))}
        </View>
      <View
        style={[
          styles.bottom,
          {
            justifyContent: index == 0 ? "flex-end" : "space-between",
          },
        ]}
      >
        {index != 0 && (
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
});
export default Quiz;