import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions,TextInput , ImageBackground, Platform, StatusBar, TouchableOpacity, Falsy, RecursiveArray, RegisteredStyle, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { Input } from "@rneui/themed";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReportDescription = ({ navigation, route }: Props) => {
  let {reportName} = route.params 
  const [InputText, setInputText] = useState("");
  const [CommentText, setCommentText] = useState("");

  return ( 

  <><SafeAreaView style={[
      styles.container]}>
        
        <View style={styles.navigationBar}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}> 
            <TouchableOpacity onPress={() => navigation.navigate("ReportTasks", {reportName})}>
              <Icon name="arrow-back" type="material"></Icon>
            </TouchableOpacity>
          </View>
          
          <View style={{flex: 20, alignItems: "center", justifyContent: "center"}}> 
            <Text style={{fontSize: 30,fontWeight: "bold"}}> {reportName}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}> 
            <TouchableOpacity onPress={() => navigation.navigate("", {reportName})}>
              <Icon name="share" type="material"></Icon>
            </TouchableOpacity>
          </View>
        </View> 
        
        <View style={{flex: 5}}>
        <View style={{ alignItems: "center", justifyContent: "center"}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}} > Task Name: testing </Text>
        </View > 
        <View >
          <TextInput
            multiline={true}
    
            style={styles.description}
            onChangeText={(description) => setInputText(description)}
            placeholder="Description..."
            value={InputText}>
          </TextInput>       
        </View>
      <View style ={{}}>
          <Text style={{fontSize: 20, fontWeight:"bold"}} > Completed by: Billy</Text>

          </View> 
      <View>
          <Text style={{fontSize: 20,fontWeight:"bold"}} > On (insert date and time)</Text>
        </View> 
      <View>
      <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.Comment}
          onChangeText={(Comment) => setCommentText(Comment)}
          placeholder="comments..."
          value={CommentText}>
        </TextInput>  
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
    marginTop: 30,
    padding: 10,
    backgroundColor: "#007AFF",
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: windowWidth * 0.8,
    height: 300,
    fontSize: 20,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  },
  Comment: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: windowWidth * 0.8,
    height: 150,
    fontSize: 20,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
  }
});

export default ReportDescription;