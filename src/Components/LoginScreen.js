import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Content,
  Item,
  Input,
  Button
} from 'native-base';

export default function LoginScreen({navigation}) {
  // let [email, setEmail] = useState('Email');
  // let [password, setPassword] = useState("Password");
  let email = '';
  let password = '';

  _handleLogin = () => {
    console.log("========handle login =====> ", email, password);
    fetch('http://09d5ba02.ngrok.io/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        _storeToken(data);
      })
      .then(navigation.navigate('App'))
      .catch(err => console.error(err));
  };

  _storeToken = async data => {
    try {
      await AsyncStorage.setItem('token', data.token);
    } catch (err) {
      console.error(err);
    }
  };

  _fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setToken(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  _handleLogout = async () => {
    try {
      await AsyncStorage.clear();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Content style={{ marginTop: 100, width: '100%' }}>
        <Item rounded>
          <Input placeholder='Email' onChangeText={text => email = text} />
        </Item>
        <Item rounded>
          <Input
            placeholder='Password'
            onChangeText={text => password = text}
            secureTextEntry={true}
          />
        </Item>
        <Button onPress={() => _handleLogin()} block light>
          <Text>Login</Text>
        </Button>
        <Button onPress={() => navigation.navigate('SignUp')} light>
          <Text>Create Account</Text>
        </Button>
      </Content>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
