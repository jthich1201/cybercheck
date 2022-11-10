import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
const Tab = createBottomTabNavigator();

const RecentReportsTab = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Recent Reports!</Text>
    </View>
  );
};

const RecentReportsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recent Reports" component={RecentReportsTab} />
    </Tab.Navigator>
  );
};

export default RecentReportsScreen;
