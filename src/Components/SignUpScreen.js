import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Content, Item, Input, Button } from "native-base";

export default function SignupScreen({navigation}) {
  let [errorMessage, setErrorMessage] = useState("");
  let email, password, password_confirmation, name = '';

  _handleSignup = () => {
    console.log("=======handle signup", name, email, password, password_confirmation);
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
        .then(navigation.navigate('Login'))
        .catch(err => console.error(err));
    } else {
      setErrorMessage('Passwords do not match');
    }
    
  };

  return (
    <View style={styles.container}>
      <Content style={{ marginTop: 100, width: '100%' }}>
        <Item rounded>
          <Input placeholder='name' onChangeText={text => name = text} />
        </Item>
        <Item rounded>
          <Input placeholder='Email' onChangeText={text => email = text } />
        </Item>
        <Item rounded>
          <Input
            placeholder='Password'
            onChangeText={text => password = text}
            secureTextEntry={true}
          />
        </Item>
        <Item rounded>
          <Input
            placeholder='Password Confirmation'
            onChangeText={text => password_confirmation = text}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
