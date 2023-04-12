import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions, ImageBackground, Platform, StatusBar, TouchableOpacity, Falsy, RecursiveArray, RegisteredStyle, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { getUser } from "../hooks/getUser";

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



const ManageOrganization = ({ navigation }: Props) => {
    let currentUser = getUser();

    return (
        <SafeAreaView
      style={[
        styles.container,
        {
          marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        },
      ]}
    ></SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ManageOrganization;