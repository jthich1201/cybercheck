import React, { useState, useEffect, SetStateAction } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Button,
  Linking,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const SignIn = ({ navigation }: Props) => {
  const [userInfo, setUserInfo] = useState<any>();
  const [auth, setAuth] = useState<any>();
  const [requireRefresh, setRequireRefresh] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "743023624865-l54654s9nq7ln65fn3svku1u80195ln1.apps.googleusercontent.com",
    iosClientId:
      "743023624865-5v5sui9ougffb0s4ue307l9be6svkm1d.apps.googleusercontent.com",
    expoClientId:
      "743023624865-g0q4g5kd53qk1m9b7p53264cfdqjkcti.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication) {
        setAuth(authentication);
        const persistAuth = async () => {
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify(response.authentication)
          );
        };
        persistAuth();
        getUserData(authentication.accessToken);
      }
    }
  }, [response]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const authString = await AsyncStorage.getItem("auth");
      if (authString != null) {
        const authFromJson = JSON.parse(authString);
        setAuth(authFromJson);
        console.log(authFromJson);
        setRequireRefresh(
          AuthSession.TokenResponse.isTokenFresh({
            expiresIn: authFromJson.expiresIn,
            issuedAt: authFromJson.issuedAt,
          })
        );
      }
    };
    getPersistedAuth();
  }, []);

  const getUserData = async (token: string) => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  };

  const getClientId = () => {
    if (Platform.OS === "ios") {
      return "743023624865-5v5sui9ougffb0s4ue307l9be6svkm1d.apps.googleusercontent.com";
    } else {
      return "743023624865-l54654s9nq7ln65fn3svku1u80195ln1.apps.googleusercontent.com";
    }
  };

  //need to think abt how to handle refreshing token automatically and not rely on user to refresh

  const refreshToken = async () => {
    const clientId = getClientId();
    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: clientId,
        refreshToken: auth.refreshToken,
      },
      {
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
      }
    );

    tokenResult.refreshToken = auth.refreshToken;

    setAuth(tokenResult);
    await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
    setRequireRefresh(false);
  };

  const logout = async () => {
    await AuthSession.revokeAsync(
      {
        token: auth.accessToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );

    setAuth(undefined);
    setUserInfo(undefined);
    await AsyncStorage.removeItem("auth");
  };

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
              if (auth) {
                navigation.navigate("RecentReportsTab", {
                  screen: "Home",
                  params: { user: userInfo },
                });
              } else {
                promptAsync({ useProxy: true, showInRecents: true });
              }
            }}
          >
            <FAIcon name="google" color="#FFFFFF" size={25} />
            <Text style={styles.buttonText}>{"\t"}Sign in with Google</Text>
          </Pressable>
        </View>
        <View style={styles.microsoftSignInContainer}>
          <Pressable
            style={styles.button}
            // onPress={
            //   auth
            //     ? getUserData
            //     : () => promptAsync({ useProxy: true, showInRecents: true })
            // }
          >
            <FAIcon name="windows" color="#FFFFFF" size={25} />
            <Text style={styles.buttonText}>{"\t"}Sign in with Microsoft</Text>
          </Pressable>
          {auth ? <Button title="Logout" onPress={logout} /> : undefined}
          {requireRefresh ? (
            <View>
              <Text>Token requires refres</Text>
              <Button title="Refresh Token" onPress={refreshToken}></Button>
            </View>
          ) : undefined}
        </View>
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
