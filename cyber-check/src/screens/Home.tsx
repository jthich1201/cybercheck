import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({ route, navigation }: Props) => {
  const { user } = route.params;
  console.log(user);
  return (
    <View style={styles.container}>
      <View>
        <Text>Welcome {user.name}</Text>
        <Text>{user.email}</Text>
      </View>
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
