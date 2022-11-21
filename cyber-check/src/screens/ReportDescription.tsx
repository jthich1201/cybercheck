import React from "react";
import { StyleSheet, View, Text, Pressable, Dimensions,TextInput , ImageBackground, Platform, StatusBar, TouchableOpacity, Falsy, RecursiveArray, RegisteredStyle, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReportDescription = ({ navigation, route }: Props) => {
  let {reportName} = route.params 

  return ( 

  <><SafeAreaView style={[
      styles.container]}>
        
        <View style={styles.navigationBar}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}> 
            <TouchableOpacity onPress={() => navigation.navigate("ReportTasks", {reportName})}>
              <Icon name="arrow-back" type="material"></Icon>
            </TouchableOpacity>
          </View>
          
         <View style={{flex: 1, justifyContent: "right", alignItems: "rtl"}}> 
            <TouchableOpacity onPress={() => navigation.navigate("", {reportName})}>
              <Icon name="share" type="material"></Icon>
            </TouchableOpacity>
          </View>
          <View style={{flex: 20, alignItems: "center", justifyContent: "center"}}> 
            <Text style={{fontSize: 30,fontWeight: "bold"}}> {reportName}</Text>
          </View>
        </View> 
        
        <View style={{flex: 5}}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingLeft: 10, paddingRight: 10}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}} > Task Name: </Text>
          </View> 
      
       
        <View style={{flex: 10, paddingLeft: 10, paddingRight: 10}}>
        
        <Text style={{fontSize: 20, fontWeight: "bold"}} > Description: </Text>
          <Border style={{borderWidth:  1}}>
            <Text style={{fontSize: 25, borderColor: "black", fontWeight: "300"}} > This is a test and a Dummy Task Description </Text>
          </Border>         
        </View>
        </View>
        
        <View style={styles.container}>
          <Pressable
            style={styles.button}
            onPress={() => {
            navigation.navigate("", {});}}>
              <Text style={styles.buttonText}> Add Comments</Text>
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
  marginBottom:  30
  }
  });

const styles = StyleSheet.create({
  test:
  {
    flex: 1
  },
  navigationBar:{
    
    flex: .5,
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
    width: windowWidth * 1,
    height: windowHeight * .05
  },
});

export default ReportDescription;