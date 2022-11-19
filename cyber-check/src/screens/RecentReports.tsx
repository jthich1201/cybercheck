import React, { useState } from "react";
import { View, Text, Dimensions, Pressable} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import Home from "./Home";
import SearchBar from "../components/searchbar";
const Tab = createBottomTabNavigator();

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

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <SearchBar
        clicked={searchPhrase}
        searchPhrase={setSearchPhrase}
        setSearchPhrase={clicked}
        setClicked={setClicked}
      ></SearchBar>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={DATA}
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

const RecentReportsScreen = ({ navigation }: Props) => (
  <><SafeAreaView style={[
    styles.container]}>
      <View style={styles.navigationBar}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}> 
          <TouchableOpacity onPress={() => navigation.navigate("ManageAccount")}>
            <Icon name="settings" type="material"></Icon>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}> 
          <Text style={{fontSize: 30}}> Recent Reports </Text>
        </View> 
        <View style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
          <TouchableOpacity //onPress={() => navigation.navigate("RecentReportsTab")}
          >
            <Icon name="tab" type="material"> </Icon>
          </TouchableOpacity>
        </View>
      </View> 

    <View style={{ flex: 6 }}>
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Recent Reports"
        component={RecentReportsTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document"
              color={color}
              size={size}
            />
          ),

          title: "Recent Reports",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
    </View>
    </SafeAreaView>
</>

);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Report",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Report",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Report",
  },
  {
    id: "3434af33-34a3-4332-aaaa-56257142ed32",
    title: "Fourth Report",
  },
  {
    id: "3434af33-34af-4332-aaaa-56257142ed32",
    title: "Fifth Report",
  },
  {
    id: "3434af33-3fa3-4332-aaaa-56257142ed32",
    title: "Sixth Report",
  },
  {
    id: "3434af33-34f3-4332-aaaa-56257142ed32",
    title: "Seven Report",
  },
  {
    id: "3434af33-34a3-43f2-aaaa-56257142ed32",
    title: "Eight Report",
  },
  {
    id: "3434af33-3fa3-4332-aafa-56257142ed32",
    title: "Ninth Report",
  },
  {
    id: "3434af33-34f3-4332-ffaa-56257142ed32",
    title: "Tenth Report",
  },
  {
    id: "3434af33-34a3-43f2-aaaa-56233142ed32",
    title: "Eleventh Report",
  },
];

const styles = StyleSheet.create({
  navigationBar:{
    backgroundColor: "grey",
    flex: .3,
    padding: 20,
    flexDirection: "row",
  },
  container: {
    flex: 1
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
  Nav:{
    
  }

});

export default RecentReportsScreen;