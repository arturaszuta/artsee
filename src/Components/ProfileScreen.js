import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text, ImageBackground } from "react-native";
import { Thumbnail, Icon, Content, Button } from 'native-base';

const ProfileScreen = ({navigation}) => {
  let [token, setToken] = useState('');
  let [userId, setUserId] = useState('');
  let [data, setData] = useState({}); 

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
      setToken(fetchedToken);
      const userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
      console.log("============== userId ========", userId);
      console.log("===============token==========", token);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
      _fetchDeviceStorage();
      if (userId) {
         fetch(`http://204ae74c.ngrok.io/users/${userId}`, {
           method: "GET",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             Authorization: token
           }
         })
           .then(res => res.json())
           .then(data => {
             setData(data);
           })
           .then(fetch(`http://204ae74c.ngrok.io/users/${userId}/following`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token
           }
         })
           .then(res => console.log(res.json()))
           .then(data => console.log('======following=====', data))
           .catch(err => console.error(err)));
      }
     
  }, [userId, token]);

  return (
    <View>
      <ImageBackground
        style={{
          height: "65%",
          width: "100%",
          justifyContent: "space-between"
        }}
        source={{ uri: data.background }}
      >
        <Thumbnail
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            marginTop: 60,
            marginLeft: 5
          }}
          source={{ uri: data.avatar }}
        />
        <Text style={{ fontSize: 20 }}>{data.name}</Text>
      </ImageBackground>
      <Content>
        <Button
          onPress={() => _handleLogout()}
          style={{ bottom: 0 }}
          block
          light
        >
          <Text>Logout</Text>
        </Button>
      </Content>
    </View>
  );
};

export default ProfileScreen;