import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import {
  Content,
  Item,
  Input,
  Button
  
} from 'native-base';

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
      <ImageBackground source={require('../../assets/auth.jpg')} style={{ flex: 1, width: width, height: height, alignItems: 'center'}}>
      <Content style={{ marginTop: 100, width: '100%' }} >
        <Item rounded>
          <Input placeholder='Email' onChangeText={text => setEmail(text)} 
          style={styles.textInput} placeholderTextColor='white' />
        </Item>
        <Item rounded>
          <Input
            style={styles.textInput}
            placeholderTextColor='white'
            placeholder='Password'
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            />
        </Item>
        {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        <Button onPress={() => _handleLogin()} block light style={styles.button}>
          <Text>Login</Text>
        </Button>
        <Button onPress={() => navigation.navigate('SignUp')} block light
        style={styles.button}>
          <Text>Create Account</Text>
        </Button>
      </Content>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    flex: 0.75,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: 10,
    marginTop: 10
  },
  button: {
    width: 250,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
  }
});
