import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({ route, navigation }: Props) => {
  const { email } = route.params;
  return (
    <View style={styles.container}>
      <Text>Hello user {email}</Text>
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