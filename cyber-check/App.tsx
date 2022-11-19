<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Quiz from './src/screens/Quiz';
>>>>>>> implemented questionnaire interface and created questions model

import Signin from "./src/screens/SignIn";
import RecentReportsScreen from "./src/screens/RecentReports";
import ManageAccount from "./src/screens/ManageAccount";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
<<<<<<< HEAD
    <>
      <NavigationContainer>
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
              gestureEnabled: true
            }}
          />
          <Stack.Screen
            name="ManageAccount"
            component={ManageAccount}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
=======
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" /> 
      <Quiz></Quiz>

    /* </View> */
  
>>>>>>> implemented questionnaire interface and created questions model
  );
};

export default App;
