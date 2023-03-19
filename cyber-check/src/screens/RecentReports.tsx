import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { StatusBar } from "react-native";

import Home from "./Home";
import SearchBar from "../components/SearchBar";
import TeamCollab from "./TeamCollab";
const Tab = createBottomTabNavigator();
type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RecentReportsTab = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();
  //const renderItem = ({ item }: { item: any }) => <Item title={item.title} />;
  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
  }: {
    item: any;
    onPress: any;
    backgroundColor: any;
    textColor: any;
  }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }: { item: any }) => {
    const backgroundColor = item.id === selectedId ? "#DDDDDD" : "#D3D3D3";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const getReports = async () => {
    axios
      .get("http://192.168.4.56:3001/Reports/getReports/487ce5ba-7717-4b9a-b59d-dfd91836f431", {
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReports();
    console.log(data);
  }, []);
  



  return (
    <View style={{ alignItems: "center" }}>
      <SearchBar
        clicked={searchPhrase}
        searchPhrase={setSearchPhrase}
        setSearchPhrase={clicked}
        setClicked={setClicked}
      ></SearchBar>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList 
          data={data}
          columnWrapperStyle={styles.row}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

const RecentReportsScreen = ({ navigation }: Props) => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SafeAreaView
          style={[
            styles.container,
            {
              marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
            },
          ]}
        >
          <View style={styles.headerContainer}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ManageAccount" as never)}
              >
                <Icon name="settings" type="material"></Icon>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.header}>Recent Reports</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("SelectIncident" as never)}
              >
                <Icon name="tab" type="material"></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <View style={{ flex: 20 }}>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Recent Reports"
              component={RecentReportsTab}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="file-outline"
                    color={color}
                    size={size}
                    type="material-community"
                  ></Icon>
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.3,
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
    fontSize: 30,
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
    marginTop: windowHeight * 0.4,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Poppins",
  },
  item: {
    backgroundColor: "#D3D3D3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 16,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  Nav: {},
});

export default RecentReportsScreen;
