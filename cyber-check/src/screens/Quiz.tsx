import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
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

const { height, width } = Dimensions.get("window");

type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;

const Option = (props: {
  keyvalue: any;
  handle: (arg0: any, arg1: any, arg2: any) => void;
  option: any;
  questionId: any;
  optionIndex: any;
  text:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [isSelected, setSelected] = useState(false);

  //   useEffect(() => {});

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!isSelected);
        props.handle(
          props.option,
          props.questionId,
          props.optionIndex,
          !isSelected
        );
      }}
      style={isSelected ? styles.optionButtonSelected : styles.optionButton}
    >
      <Text style={styles.optionText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const Quiz = ({ navigation }: Props) => {
  const [index, setIndex] = useState(0);
  const [isComplete, setComplete] = useState(false);
  const [nextQuestionId, setNextQuestionId] = useState(0);
  const [chosenOptions, setChosenOptions] = useState([]);
  const [isNextButtonVisible, setNextButtonVisibility] = useState(false);

  useEffect(() => {});

  const handleNextPress = () => {
    if (nextQuestionId != -1) {
      setNextButtonVisibility(false);
      setIndex(nextQuestionId);
    }
  };
  const handlePrevPress = () => {};
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
        <Pressable onPress={() => navigation.navigate("SelectIncident")}>
          <Icon name="arrow-back-ios" type="material"></Icon>
        </Pressable>
        <Text style={styles.header}>Create New{"\n"}Report</Text>
        <Pressable onPress={() => navigation.navigate("Quiz")}>
          <Icon name="arrow-forward-ios" type="material"></Icon>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Q. {QuestionsData[index]["question"]}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          {QuestionsData[index]["options"].map((option) => (
            <Option
              key={
                index.toString() +
                ", " +
                QuestionsData[index]["options"].indexOf(option).toString()
              }
              questionId={index}
              optionIndex={QuestionsData[index]["options"].indexOf(option)}
              text={option.option_text}
              option={option}
              handle={handleOptionPress}
            />
          ))}
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={handlePrevPress}
          >
            <Text style={styles.navigateText}>Previous</Text>
          </TouchableOpacity>
          {isNextButtonVisible && (
            <TouchableOpacity
              style={styles.navigateButton}
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
    // borderWidth: 2.5,
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
    backgroundColor: "#cadb2a",
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
    backgroundColor: "#009d7a",
    width: width * 0.25,
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
  },
  navigateText: {
    color: "white",
    fontSize: 15,
  },
});
export default Quiz;
