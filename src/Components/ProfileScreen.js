import React from 'react';
import { View, Text, Button, ImageBackground } from "react-native";
import { Thumbnail, Icon } from 'native-base';

const ProfileScreen = ({navigation}) => {
  navigationOptions = {
    title: 'Profile'
  }
  return (
    <View>
      <ImageBackground
        style={{
          height: "70%",
          width: "100%",
          alignItems:"center"
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
          Ralph Wiggum
        </Text>
        <Text style={{ backgroundColor: "black", color: "white" }}>
          Me fail English? That's unpossible!
        </Text>
        <Text style={{ backgroundColor: "black", color: "white" }}>
          Location: Springfield, IL
        </Text>
        <Icon type="FontAwesome5" name="user-plus" style={{alignSelf:'flex-start'}}/>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;