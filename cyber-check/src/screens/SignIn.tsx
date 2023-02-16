import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions, Linking } from "react-native";
import { useFonts } from "expo-font";
import { Input, CheckBox } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlipInEasyX } from "react-native-reanimated";
import { Icon } from "@rneui/base";
import FAIcon from "react-native-vector-icons/FontAwesome";

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
        <Icon name="closed-caption" type="material" color="#007AFF" size={70} />

        <Text style={styles.headerText}>Welcome to {"\n"}Cyber Checklist </Text>
      </View>

      <Text style={styles.title}>Sign in with Your Organization</Text>

      <View style={styles.signInContainer}>
        <View style={styles.googleSignInContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("RecentReportsTab", {
                screen: "Home",
                params: { email: userEmail },
              });
            }}
          >
            <FAIcon name="google" color="#FFFFFF" size={25} />
            <Text style={styles.buttonText}>{"\t"}Sign in with Google</Text>
          </Pressable>
        </View>
        <View style={styles.microsoftSignInContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("RecentReportsTab", {
                screen: "Home",
                params: { email: userEmail },
              });
            }}
          >
            <FAIcon name="windows" color="#FFFFFF" size={25} />
            <Text style={styles.buttonText}>{"\t"}Sign in with Microsoft</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account? {"\n"}Sign In
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    paddingTop: 50,
    alignItems: "flex-end",
    paddingLeft: 25,
    backgroundColor: "#fff",
  },
  headerText: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    paddingRight: 15,
    textAlign: "right",
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
    backgroundColor: "#fff",
    alignItem: "center",
    textAlign: "center",
    paddingTop: 40,
  },
  signInContainer: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  googleSignInContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  microsoftSignInContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
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
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 25,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footerText: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

export default SignIn;
