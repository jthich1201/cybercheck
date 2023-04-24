import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Platform,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
} from "react-native";
// import filter from "lodash.filter";
var _ = require("lodash");
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { scale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { getUser } from "../hooks/getUser";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserList } from "../types/User";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ManageUsers = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserList[]>([]);
  const [ipAddress, setIpAddress] = useState("");
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState<UserList[]>([]);
  const [addModal, setAddModal] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [shareLink, setShareLink] = useState(false);

  useEffect(() => {
    const getIp = async () => {
      try {
        const value = await AsyncStorage.getItem("ipAddress");
        if (value !== null) {
          setIpAddress(JSON.parse(value));
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };
    getIp();
  }, []);

  useEffect(() => {
    if (ipAddress) getUsers();
  }, [ipAddress]);

  const getUsers = async () => {
    console.log("hello", `${ipAddress}:3001/Users`);

    const res = await axios.get(`http://${ipAddress}:3001/Users`);
    const userList = res.data as UserList[];
    console.log(userList);
    userList.sort((a: UserList, b: UserList) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    console.log(userList);
    setUsers(userList);
    setFullData(userList);
    setIsLoading(false);
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          marginVertical: 10,
          borderRadius: 10,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />
      </View>
    );
  };

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = _.filter(fullData, (user: UserList) => {
      console.log(user);
      return contains(user, formattedQuery);
    });
    setUsers(filteredData);
    setQuery(text);
  };

  const contains = (user: UserList, query: string) => {
    console.log("here", user);
    if (user.name.includes(query) || user.email.includes(query)) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.navigate("ManageAccount")}>
          <Icon name="arrow-back-ios" type="material"></Icon>
        </Pressable>
        <Text style={styles.header}>Manage Users</Text>
        <Pressable onPress={() => setAddModal(true)}>
          <Icon name="add" type="material"></Icon>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            ListHeaderComponent={renderHeader}
            data={users}
            keyExtractor={(item) => item.user_id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <Modal visible={addModal} animationType="slide">
        <View style={styles.contentContainer}>
          <View>
            <Text>What type of user would you like to add?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setAddModal(true);
                setUserRole("default");
                setShareLink(true);
              }}
            >
              <Text style={styles.buttonText}>Regular User</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                setAddModal(true);
                setUserRole("Admin");
                setShareLink(true);
              }}
            >
              <Text style={styles.buttonText}>Admin User</Text>
            </Pressable>
          </View>
        </View>
        <Modal visible={shareLink}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Share this link with the user</Text>
            <TextInput
              editable={false}
              placeholder={`com.onlydevs.cybercheck://add-user/${userRole}`}
            ></TextInput>
            <Pressable>
              <Icon name="ios-share" type="material"></Icon>
            </Pressable>
          </View>
        </Modal>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  header: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: scale(50),
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  button: {
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    width: scale(100),
    height: scale(100),
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
});

export default ManageUsers;
