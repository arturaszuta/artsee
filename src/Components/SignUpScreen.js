import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground
} from "react-native";
import { Content, Item, Input, Button } from "native-base";

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
      <ImageBackground source={require('../../assets/auth.jpg')} style={{ flex: 1, width: width, height: height, alignItems: 'center'}}>
      <Content style={{ marginTop: 100, width: '100%' }}>
        <Item rounded>
          <Input 
          placeholder='name' 
          onChangeText={text => name = text} 
          placeholderTextColor='white' 
          style={styles.textInput}/>
        </Item>
        <Item rounded>
          <Input 
          placeholder='Email' 
          onChangeText={text => email = text } 
          style={styles.textInput} 
          placeholderTextColor='white' />
        </Item>
        <Item rounded>
          <Input
            placeholder='Password'
            onChangeText={text => password = text}
            secureTextEntry={true}
            style={styles.textInput}
            placeholderTextColor='white'
          />
        </Item>
        <Item rounded>
          <Input
            placeholder='Password Confirmation'
            onChangeText={text => password_confirmation = text}
            secureTextEntry={true}
            placeholderTextColor='white'
            style={styles.textInput}
          />
        </Item>
        {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        <Button onPress={() => _handleSignup()} block light style={styles.button}>
          <Text>Create An Account</Text>
        </Button>
      </Content>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
