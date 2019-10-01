import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text, ImageBackground } from "react-native";
import { Thumbnail, Icon, Content, Button } from 'native-base';

const ProfileScreen = ({navigation}) => {
  let [token, setToken] = useState('');
  let [userId, setUserId] = useState('');

  _handleLogout = async () => {
    try {
      AsyncStorage.clear();
      navigation.navigate('Auth');
    } catch (err) {
      console.error(err);
    }
  };

  _fetchDeviceStorage = async () => {
    try {
      const fetchedToken = await AsyncStorage.getItem('token');
      console.log("========== fetch token ==========", fetchedToken);
      setToken(fetchedToken);
      const userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
      fetch(`http://047934fb.ngrok.io/users/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json",
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });   
  }, [userId, token]);
  _fetchDeviceStorage();
  return (
    <View>
      <ImageBackground
        style={{
          height: "70%",
          width: "100%",
          alignItems: "center"
        }}
      >
        <Thumbnail
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            borderColor: "black",
            marginTop: 40
          }}
        />
        <Text
          style={{ backgroundColor: "black", color: "white", fontSize: 20 }}
        >
          {}
        </Text>
        <Text style={{ backgroundColor: "black", color: "white" }}>
          Me fail English? That's unpossible!
        </Text>
        <Text style={{ backgroundColor: "black", color: "white" }}>
          Location: Springfield, IL
        </Text>
        <Icon
          type="FontAwesome5"
          name="user-plus"
          style={{ alignSelf: "flex-start" }}
        />
      </ImageBackground>
      <Content>
        <Button onPress={() => _handleLogout()} block light>
          <Text>Logout</Text>
        </Button>
      </Content>
    </View>
  );
};

export default ProfileScreen;