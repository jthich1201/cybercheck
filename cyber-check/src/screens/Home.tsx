import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";
import { getUser } from "../hooks/getUser";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({ route, navigation }: Props) => {
  let currentUser = getUser();
  return (
    <View style={styles.container}>
      {currentUser && (
        <View>
          <Text>Welcome {currentUser.name}</Text>
          <Text>{currentUser.email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
