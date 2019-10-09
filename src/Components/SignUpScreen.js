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

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../styles/variables";

import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignupScreen({navigation}) {
  let [errorMessage, setErrorMessage] = useState("");
  let email, password, password_confirmation, name = '';

  var {height, width} = Dimensions.get('window');

  _handleSignup = () => {
    if (password === password_confirmation) {
      fetch("https://artsee-back-end.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation
          }
        })
      })
        .then(navigation.navigate('SecondSignup', { email }))
        .catch(err => console.error(err));
    } else {
      setErrorMessage('Passwords do not match');
    }
    
  };

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
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
            Create Account
          </Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="account-circle" size={40} style={styles.icon} />
            <TextInput
              placeholder="Name"
              onChangeText={text => (name = text)}
              placeholderTextColor="white"
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="email-outline" size={40} style={styles.icon} />
            <TextInput
              placeholder="Email"
              onChangeText={text => (email = text)}
              placeholderTextColor="white"
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="lock" size={40} style={styles.icon} />
            <TextInput
              placeholder="Password"
              onChangeText={text => (password = text)}
              placeholderTextColor="white"
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="lock" size={40} style={styles.icon} />
            <TextInput
              placeholder="Password Confirmation"
              onChangeText={text => (password_confirmation = text)}
              placeholderTextColor="white"
              style={styles.textInput}
              placeholderTextColor="grey"
            />
          </View>
          {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        </View>
        <TouchableOpacity
          onPress={() => _handleSignup()}
          style={styles.button}
        >
          <Text style={{ color: "white" }}>Create Account</Text>
        </TouchableOpacity>
  
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
    backgroundColor: "black",
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
    justifyContent: "center"
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
