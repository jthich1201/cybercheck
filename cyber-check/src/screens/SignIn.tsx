import React, { useState, useEffect, SetStateAction } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Button,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import * as Linking from 'expo-linking';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const SignIn = ({ navigation }: Props) => {
  const [userInfo, setUserInfo] = useState<any>();
  const [auth, setAuth] = useState<any>();
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  Linking.addEventListener('url', ({ url }) => {
    if (url.startsWith('com.onlydevs.cybercheck://Create-Admin-User')) {
      setAdmin(true);
      SaveUserData();
    }
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "743023624865-l54654s9nq7ln65fn3svku1u80195ln1.apps.googleusercontent.com",
    iosClientId:
      "743023624865-5v5sui9ougffb0s4ue307l9be6svkm1d.apps.googleusercontent.com",
    expoClientId:
      "743023624865-g0q4g5kd53qk1m9b7p53264cfdqjkcti.apps.googleusercontent.com",
  });

  const azureTenantId = "ad0f0abb-f1c1-418d-86f5-540d614fa547";
  const discovery = AuthSession.useAutoDiscovery(
    `https://login.microsoftonline.com/${azureTenantId}/v2.0`
  );
  const getAzureConfig = () => {
    if (Platform.OS === "ios") {
      let config = {
        clientId: "b1f7df32-6897-4434-8af4-2eb550090d2e",
        redirectUri: "msauth.com.onlydevs.cybercheck://auth",
      };
      return config;
    } else if (Platform.OS === "android") {
      let config = {
        clientId: "b1f7df32-6897-4434-8af4-2eb550090d2e",
        redirectUri:
          "msauth://com.onlydevs.cybercheck/ga0RGNYHvNM5d0SLGQfpQWAPGJ8%3D",
      };
      return config;
    }
  };
  const config = getAzureConfig();
  const [token, setToken] = React.useState<string | null>(null);
  const [azureRequest, azureResponse, azurePromptAsync] =
    AuthSession.useAuthRequest(
      {
        clientId: config!.clientId,
        scopes: ["openid", "profile", "email", "offline_access", "User.Read"],
        redirectUri: config!.redirectUri,
      },
      discovery
    );

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
const SaveUserData = async () => {
  axios.post("http//localhost:3001/Users/saveUsers", { name: userInfo.name, email: userInfo.email, role: admin ? "admin" : "user"})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  
}
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

  const logoutGoogle = async () => {
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

  const callMsGraph = async (token: string) => {
    let graphResponse = null;
    await fetch("https://graph.microsoft.com/v1.0/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        graphResponse = response;
        console.log("gresponse:", response);
      })
      .catch((error) => {
        graphResponse = error;
      });

    const finalResponse = {
      ...graphResponse,
      type: "success",
    };
    console.log("final repsonse", finalResponse);
    return finalResponse;
  };

  const signInAzure = async () => {
    // if (signedIn) {
    //   if (userInfo) {
    //     navigation.navigate("RecentReportsTab", {
    //       screen: "Home",
    //       params: { user: userInfo },
    //     });
    //   } else if (token) {
    //     callMsGraph(token);
    //   } else {
    //     console.log("no user info or token");
    //   }
    // } else {
    if (!config) return;
    let clientId = config.clientId;
    let redirectUri = config.redirectUri;
    azurePromptAsync().then((codeResponse) => {
      console.log(codeResponse);
      if (azureRequest && codeResponse?.type === "success" && discovery) {
        //Exchange the code to get the JWT
        AuthSession.exchangeCodeAsync(
          {
            clientId,
            code: codeResponse.params.code,
            //Reuse the codeVerifier for PCKE
            extraParams: azureRequest.codeVerifier
              ? { code_verifier: azureRequest.codeVerifier }
              : undefined,
            redirectUri,
          },
          discovery
        ).then(async (res) => {
          setToken(res.accessToken);
          await callMsGraph(res.accessToken).then((res) => {
            if (res.type === "success") {
              var userData = {
                id: res.id,
                name: res.displayName,
                email: res.mail,
              };
              setUserInfo(userData);
              navigation.navigate("RecentReportsTab", {
                screen: "Home",
                params: { user: userData },
              });
              setSignedIn(true);
            }
          });
        });
      }
    });
    // }
  };

  const logoutAzure = async () => {
    const logoutResponse = await fetch(
      "https://login.microsoftonline.com/common/oauth2/v2.0/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=${config!.clientId}&token=${token}`,
      }
    );
    console.log(logoutResponse);
    setSignedIn(false);
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
            onPress={() => {
              signInAzure();
            }}
          >
            <FAIcon name="windows" color="#FFFFFF" size={25} />
            <Text style={styles.buttonText}>{"\t"}Sign in with Microsoft</Text>
          </Pressable>
          {signedIn ? (
            <Button title="Logout Azure" onPress={logoutAzure} />
          ) : undefined}
          {auth ? (
            <Button title="Logout Google" onPress={logoutGoogle} />
          ) : undefined}
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
