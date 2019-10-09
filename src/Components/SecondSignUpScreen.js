import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput
} from "react-native";
import Constants from "expo-constants";
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../styles/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SecondSignUpScreen({navigation}, ) {
  let [errorMessage, setErrorMessage] = useState("");
  let city, tagline, avatar, background,email = '';

  var {height, width} = Dimensions.get('window');

  
  

  _updateProfile = () => {
    email = navigation.state.params.email;
    
      fetch("https://artsee-back-end.herokuapp.com/usersupdate", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            city,
            tagline,
            avatar,
            background,
            email
          }
        })
      })
        .then(navigation.navigate('Login'))
        .catch(err => console.error(err));
    } 
    
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/auth_2.jpeg")}
        style={{
          flex: 1,
          width: width,
          height: height,
          alignItems: "center",
          resizeMode: "cover"
        }}
      >
        <View
          style={{
            flex: 1,
            width: "90%",
            height: "50%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(52, 52, 52, 0.5)"
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="city-variant-outline" size={40} style={styles.icon} />
            <TextInput
              placeholder="City"
              onChangeText={text => (city = text)}
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="grease-pencil" size={40} style={styles.icon} />
            <TextInput
              placeholder="Tagline...make it quirky!"
              onChangeText={text => (tagline = text)}
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="face-recognition" size={40} style={styles.icon} />
            <TextInput
              placeholder="Avatar URL"
              onChangeText={text => (avatarUrl = text)}
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="image-area" size={40} style={styles.icon} />
            <TextInput
              placeholder="Background URL"
              onChangeText={text => (backgroundUrl = text)}
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
          <TouchableOpacity
            onPress={() => _updateProfile()}
            style={styles.button}
          >
            <Text style={{ color: "white" }}>Finalize</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
  }


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  textInput: {
    paddingHorizontal: 65,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 20,
    // padding: 10,
    backgroundColor: 'black',
    // borderWidth: 2,
    borderColor: "white",
    // borderColor: colors.color3,
    color: colors.color3,
    width: 300
  },
  button: {
    width: 300,
    height: 50,
    margin: 10,
    borderRadius: 25,
    backgroundColor: colors.color5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: colors.text,
  },
  buttonText: {
    color: colors.text
  },
  icon: {
    color: colors.text,
    paddingTop: 4.3,
    paddingBottom: 4.3,
    position: "absolute",
    left: 14,
    top: 19,
    zIndex: 1
  }
});
