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
  Modal,
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
import { Report } from "../types/Report";

const Tab = createBottomTabNavigator();
type RootStackParamList = {};
type Props = NativeStackScreenProps<RootStackParamList>;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RecentReportsTab = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [report, setReport] = useState<Report[]>([]);
  //const renderItem = ({ item }: { item: any }) => <Item title={item.title} />;
  const Item = ({
    item,
    onPress,
    onLongPress,
    backgroundColor,
    textColor,
  }: {
    item: any;
    onPress: any;
    onLongPress: any;
    backgroundColor: any;
    textColor: any;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.item, backgroundColor]}
    >
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  const [selectedId, setSelectedId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report>();
  const renderItem = ({ item }: { item: any }) => {
    const backgroundColor = item.id === selectedId ? "#DDDDDD" : "#D3D3D3";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          console.log(item);
          setSelectedId(item.reportId);
        }}
        onLongPress={() => {
          setSelectedReport(item);
          setShowModal(true);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  const IP = process.env.IP;
  const getReports = async () => {
    axios
      .get(
        "http://192.168.1.3:3001/Reports/getReports/487ce5ba-7717-4b9a-b59d-dfd91836f431",
        {}
      )
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      ></SearchBar>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={report}
          columnWrapperStyle={styles.row}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.reportId}
          extraData={selectedId}
        />
      </View>
      <Modal visible={showModal} animationType="slide">
        {selectedReport && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 24 }}>{selectedReport.title}</Text>
            <Text style={{ fontSize: 24 }}>Type: {selectedReport.type}</Text>
            <Text style={{ fontSize: 24 }}>
              Status: {selectedReport.status}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ color: "blue", marginTop: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
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
};

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