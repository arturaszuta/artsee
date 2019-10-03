import React, { useState, useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Header } from "react-native";
import { AppLoading, SplashScreen } from "expo";

import Icon from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";
import mainStyle from "./styles/main";

import MapScreen from "./src/Components/MapScreen/MapScreen";
import ProfileScreen from "./src/Components/ProfileScreen/ProfileScreen";
import FeedScreen from "./src/Components/FeedScreen/FeedScreen";
import CameraScreen from "./src/Components/CameraScreen";
import LoginScreen from "./src/Components/LoginScreen";
import SignUpScreen from "./src/Components/SignUpScreen";
import AuthLoadingScreen from "./src/Components/AuthLoadingScreen";
import SplashLoadingScreen from "./src/Components/SplashLoadingScreen";
import SecondSignUpScreen from "./src/Components/SecondSignUpScreen";

const AppStack = createBottomTabNavigator(
  {
    Map: MapScreen,
    Feed: FeedScreen,
    Camera: CameraScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;

        switch (routeName) {
          case "Map":
            iconName = "map";
            break;
          case "Profile":
            iconName = "ghost";
            break;
          case "Camera":
            iconName = "camera-retro";
            break;
          case "Feed":
            iconName = "broadcast-tower";
            break;
          default:
            return;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#39c2c9",
      inactiveTintColor: "#363a43",
      style: mainStyle.tabBar
    }
  }
);

const Foot = createAppContainer(AppStack);

const Main = () => {
  return (
    <View style={mainStyle.container}>
      {/* <Header 
        leftComponent={{
            text: "artsee"
        }}
      /> */}
      <Foot />
    </View>
  )
}

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  }
});

const App = () => {
  const [fontLoaded, setLoaded] = useState(false);
  

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setTimeout(() => {
      setLoaded(true);

    },2000)
  };

  
  
  return !fontLoaded ? <AppLoading>
    <View>
      <Text>
        Hello?
      </Text>
    </View>
  </AppLoading> : Main();
};

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      Splash: SplashLoadingScreen,
      SecondSignup: SecondSignUpScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);