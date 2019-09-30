import React from 'react';
import { AsyncStorage, View, Text, ImageBackground } from "react-native";
import { Thumbnail, Icon, Content, Button } from 'native-base';

const ProfileScreen = ({navigation}) => {
  _handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      // setToken("");
      // setUsername("");
      navigation.navigate('Auth');
    } catch (err) {
      console.error(err);
    }
  };

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
          Ralph Wiggum
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