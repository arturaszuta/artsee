import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Content, Item, Input, Button } from "native-base";

export default function SignupScreen({navigation}) {
  let [token, setToken] = useState('');
  let [errorMessage, setErrorMessage] = useState("");
  let [email, setEmail] = useState("Email");
  let [password, setPassword] = useState("Password");
  let [password_confirmation, setPasswordConfirmation] = useState(
    "Password Confirmation"
  );
  let [user, setUsername] = useState("");
  let [name, setName] = useState("Name");


  _handleSignup = () => {
    console.log("=======handle signup", name, email, password, password_confirmation);
    if (password === password_confirmation) {
      fetch("http://09d5ba02.ngrok.io/users", {
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
        .then(res => res.json())
        .then(data => {
          _storeToken(data);
        })
        .then(navigation.navigate('Login'))
        .catch(err => console.error(err));
    } else {
      setErrorMessage('Passwords do not match');
    }
    
  };

  _storeToken = async data => {
    try {
      console.log('======data=====', data)
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("username", data.username);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Content style={{ marginTop: 100, width: "100%" }}>
        <Item rounded>
          <Input placeholder="name" onChangeText={text => setName(text)} />
        </Item>
        <Item rounded>
          <Input placeholder="Email" onChangeText={text => setEmail(text)} />
        </Item>
        <Item rounded>
          <Input
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </Item>
        <Item rounded>
          <Input
            placeholder="Password Confirmation"
            onChangeText={text => setPasswordConfirmation(text)}
            secureTextEntry={true}
          />
        </Item>
        {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        <Button onPress={() => _handleSignup()} block light>
          <Text>Create An Account</Text>
        </Button>
        <Button onPress={() => navigation.navigate('Login')} block light>
          <Text>Login</Text>
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
