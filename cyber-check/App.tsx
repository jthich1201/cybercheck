import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./src/screens/SignIn";
import RecentReportsScreen from "./src/screens/RecentReports";
import ManageAccount from "./src/screens/ManageAccount";
import SelectIncident from "./src/screens/SelectIncident";
import Quiz from "./src/screens/Quiz";
import ReportTasks from "./src/screens/ReportTasks";
import TeamCollab from "./src/screens/TeamCollab";
import TaskComment from "./src/screens/TaskComment";
import TaskDescription from "./src/screens/TaskDescription";
import Submit from "./src/screens/Submit";

import linking from "./src/constants/linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const clearAsyncStorage = async () => {
      await AsyncStorage.clear();
    };
    clearAsyncStorage();
    console.log("Executing ----------------------------------------");
  }, []);

  return (
    <>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RecentReportsTab"
            component={RecentReportsScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="ManageAccount"
            component={ManageAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectIncident"
            component={SelectIncident}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TaskComment"
            component={TaskComment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Submit"
            component={Submit}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReportTasks"
            component={ReportTasks}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TeamCollab"
            component={TeamCollab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TaskDescription"
            component={TaskDescription}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
