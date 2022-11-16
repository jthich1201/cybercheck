import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { Input, CheckBox } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const SignIn = ({ navigation }: Props) => {
  const [userEmail, setUserEmail] = useState("");
  const [saveUser, setSaveUser] = useState(false);

  console.log(userEmail);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign in with SSO</Text>
      </View>
      <View style={styles.signInContainer}>
        <Input
          style={styles.input}
          onChangeText={(value) => {
            setUserEmail(value);
            console.log(userEmail);
          }}
          placeholder="Enter Your Email Address"
          value={userEmail}
          leftIcon={{ type: "material", name: "email" }}
        />
        <View>
          <CheckBox
            title="Remember Me"
            checked={saveUser}
            onPress={() => setSaveUser(!saveUser)}
            checkedColor="#007AFF"
            wrapperStyle={styles.checkBox}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("RecentReportsTab", { });
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 140,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
  },
  header: {
    color: "black",
    fontWeight: "bold",
    // fontFamily: "Poppins",
    fontSize: 45,
  },
  signInContainer: {
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    width: "80%",
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
    marginTop: windowHeight * 0.4,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Poppins",
  },
  checkBox: {
    alignSelf: "flex-start",
    float: "left",
  },
});

export default SignIn;
