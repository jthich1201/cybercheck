import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';

const HamburgerMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType= 'slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello User</Text>
            <Pressable
              onPress={
                () => {setModalVisible(!modalVisible);
              navigation.navigate("ManageAccount", { })
            } 
          }
            >
              <Text style={styles.textStyle}>Edit User</Text>
            </Pressable>
            
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)} >
        <ImageBackground
        source={require('../assets/images/hamburgerMenu.png')} 
        resizeMode= 'contain' 
        style={styles.image}>
    </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 25

  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HamburgerMenu;