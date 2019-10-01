import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text, ImageBackground, Image } from "react-native";
import { Thumbnail, Content, Button, Tab, Tabs, TabHeading, Icon } from 'native-base';

import LikeScreen from './LikeScreen';
import BookmarkScreen from './BookmarkScreen';
import SeenScreen from './SeenScreen';

const ProfileScreen = ({navigation}) => {
  let [token, setToken] = useState('');
  let [userId, setUserId] = useState('');
  let [userData, setUserData] = useState({}); 
  let [followingComp, setFollowingComp] = useState([]);

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
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
      _fetchDeviceStorage();
      if (userId) {
         fetch(`http://a7c53c97.ngrok.io/users/${userId}`, {
           method: "GET",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             Authorization: token
           }
         })
           .then(res => res.json())
           .then(data => {
             setUserData(data);
           })
           .then(
             fetch(`http://a7c53c97.ngrok.io/users/${userId}/following`, {
               method: "GET",
               headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 Authorization: token
               }
             })
               .then(res => res.json())
               .then(data => {
                 const comp = data.map((obj, idx) => {
                   return (
                     <Thumbnail
                       key={data[idx].id}
                       id={data[idx].id}
                       style={{ height: 50, width: 50, marginRight: 5 }}
                       source={{ uri: data[idx].avatar }}
                     />
                   );
                 });
                 setFollowingComp(comp);
               })
               .catch(err => console.error(err))
           );
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
        source={{ uri: userData.background }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Thumbnail
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              marginTop: 60,
              marginLeft: 5
            }}
            source={{ uri: userData.avatar }}
          />
          <Text
            style={{ fontSize: 30, alignSelf: "flex-end", marginRight: 20 }}
          >
            {userData.name}
          </Text>
        </View>
      </ImageBackground>
      <Content>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text>Following</Text>
          {followingComp}
        </View>
        <Tabs style={{ marginTop: 15 }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#17bebb" }}>
                <Icon name="heart" style={{ color: "white" }} />
              </TabHeading>
            }
          >
            <LikeScreen />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#17bebb" }}>
                <Icon name="bookmark" style={{ color: "white" }} />
              </TabHeading>
            }
          >
            <BookmarkScreen />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#17bebb" }}>
                <Icon name="eye" style={{ color: "white" }} />
              </TabHeading>
            }
          >
            <SeenScreen />
          </Tab>
        </Tabs>
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