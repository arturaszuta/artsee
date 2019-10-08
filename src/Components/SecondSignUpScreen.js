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
       <ImageBackground source={require('../../assets/auth.jpg')} style={{ flex: 1, width: width, height: height, alignItems: 'center'}}>
      <Content style={{ marginTop: 100, width: '100%' }}>
        <Item rounded>
          <Input 
          placeholder='city you live in' 
          onChangeText={text => city = text}
          style={styles.textInput}
          placeholderTextColor='white' />
        </Item>
        <Item rounded>
          <Input 
          placeholder='tagline...something quirky!' 
          onChangeText={text => tagline = text }
          style={styles.textInput}
          placeholderTextColor='white' />
        </Item>
        <Item rounded>
          <Input
            placeholder='avatar url'
            onChangeText={text => avatarUrl = text}
            style={styles.textInput}
            placeholderTextColor='white'
          />
        </Item>
        <Item rounded>
          <Input
            placeholder='background url'
            onChangeText={text => backgroundUrl = text}
            style={styles.textInput}
            placeholderTextColor='white'
          />
        </Item>
        {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        <Button onPress={() => _updateProfile()} block light style={styles.button}>
          <Text>Finalize</Text>
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
