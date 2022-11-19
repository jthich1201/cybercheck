import React from "react";
import { StyleSheet, View, Text, Pressable, Dimensions, ImageBackground, Platform, StatusBar, TouchableOpacity, Falsy, RecursiveArray, RegisteredStyle, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ManageAccount = ({ navigation }: Props) => {
  return ( 
  <><SafeAreaView style={[
      styles.container]}>
        <View style={styles.navigationBar}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}> 
            <TouchableOpacity onPress={() => navigation.navigate("RecentReportsTab")}>
              <Icon name="arrow-back" type="material"></Icon>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}> 
            <Text style={{fontSize: 30}}> Profile </Text>
          </View> 
          <View style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("RecentReportsTab")}>
              <Icon name="settings" type="material"> </Icon>
            </TouchableOpacity>
          </View>
        </View> 
        <View
          style={{ flex: 1,  alignItems: "center", justifyContent: "center"}}>
            <Icon name="account-circle" type="material" size={100}></Icon>
        </View>
        <View style={{flex: 2}}>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}} > Name: </Text>
          <Border style={{borderWidth:  1}}>
            <Text style={{fontSize: 25, borderColor: "black", fontWeight: "300"}} > Keaton Wakefield </Text>
          </Border>  
        </View>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}} > Email: </Text>
          <Border style={{borderWidth:  1}}>
            <Text style={{fontSize: 25, borderColor: "black", fontWeight: "300"}} > keatonwakefield@csus.edu </Text>
          </Border>    
        </View>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}} > Orginization: </Text>
          <Border style={{borderWidth:  1}}>
            <Text style={{fontSize: 25, borderColor: "black", fontWeight: "300"}} > CSUS </Text>
          </Border>         
        </View>
        </View>
        <View style={styles.container}>
          <Pressable
            style={styles.button}
            onPress={() => {
            navigation.navigate("RecentReportsTab", {});}}>
              <Text style={styles.buttonText}>Reports</Text>
          </Pressable>
        </View>
      </SafeAreaView></> 
  );
};
const  Border  =  (props: any)  =>  (
  <View  style={[stylesForBorders.example,props.style]}>
  {props.children}
  </View>
  );
  const  stylesForBorders  =  StyleSheet.create({ container:  {
  flex:  1,
  justifyContent:  'center', alignItems:  'center'
  },
  example:  {
  marginBottom:  15
  }
  });

const styles = StyleSheet.create({
  test:
  {
    flex: 1
  },
  navigationBar:{
    backgroundColor: "grey",
    flex: .3,
    padding: 20,
    flexDirection: "row",
  },
  container: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: windowWidth * 0.2,
    height: windowHeight * .05
  },
});

export default ManageAccount;