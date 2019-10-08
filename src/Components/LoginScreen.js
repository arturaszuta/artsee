import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TextInput
} from 'react-native';
import Constants from 'expo-constants';

import { colors } from '../../styles/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {
  let [email, setEmail] = useState("Email");
  let [password, setPassword] = useState("Password");
  let [errorMessage, setErrorMessage] = useState('');

  var {height, width} = Dimensions.get('window');

  _handleLogin = () => {
    console.log("========handle login =====> ", email, password);
    fetch(`https://artsee-back-end.herokuapp.com/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        // if (data.error === unauthorized) {
        //   console.log('unauthorized login')
        //   setErrorMessage("Invalid email or password");
        //   return;
        // } else {
        //   _storeToken(data);
        // }
        _storeToken(data);
      })
      .then(navigation.navigate("Splash"))
      .catch(err => console.error(err));
  };

  _storeToken = async data => {
    console.log('===== data =====', data)
    try {
      await AsyncStorage.setItem('userId', (data.user_id).toString());
      await AsyncStorage.setItem('token', data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/auth_2.jpeg')} style={{ flex: 1, width: width, height: height, alignItems: 'center', resizeMode: 'cover' }}>
      <View style={{ 
        flex: 1,
        width: '100%', 
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center" }} 
      >
        <TextInput placeholder='Email' onChangeText={text => setEmail(text)} 
        style={styles.textInput} placeholderTextColor='white' />
        <TextInput
          style={styles.textInput}
          placeholderTextColor='white'
          placeholder='Password'
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          />
        {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        <TouchableOpacity onPress={() => _handleLogin()} style={styles.button} >
          <Text style={styles.buttonText} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button} >
          <Text style={styles.buttonText} >Create Account</Text>
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
    alignContent: 'center'
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    backgroundColor: colors.text,
    borderWidth: 2,
    borderColor: colors.color3,
    color: colors.color3,
    width: '60%'
  },
  button: {
    width: 200,
    height: 60,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.color1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.text,
    borderWidth: 1
  },
  buttonText: {
    color: colors.text,
  }
});
