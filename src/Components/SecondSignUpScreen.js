import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Content, Item, Input, Button } from "native-base";

export default function SecondSignUpScreen({navigation}, ) {
  let [errorMessage, setErrorMessage] = useState("");
  let city, tagline, avatar, background,email = '';

  
  

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
      <Content style={{ marginTop: 100, width: '100%' }}>
        <Item rounded>
          <Input placeholder='city you live in' onChangeText={text => city = text} />
        </Item>
        <Item rounded>
          <Input placeholder='tagline...something quirky!' onChangeText={text => tagline = text } />
        </Item>
        <Item rounded>
          <Input
            placeholder='avatar url'
            onChangeText={text => avatarUrl = text}
          />
        </Item>
        <Item rounded>
          <Input
            placeholder='background url'
            onChangeText={text => backgroundUrl = text}
          />
        </Item>
        {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
        <Button onPress={() => _updateProfile()} block light>
          <Text>Update Profile</Text>
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
