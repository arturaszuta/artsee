import React, { useState, useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Header } from "react-native";
import { AppLoading } from "expo";

import Icon from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";
import mainStyle from "./styles/main";

import MapScreen from "./src/Components/MapScreen/MapScreen";
import ProfileScreen from "./src/Components/ProfileScreen";
import FeedScreen from "./src/Components/FeedScreen";
import CameraScreen from "./src/Components/CameraScreen";
import LoginScreen from "./src/Components/LoginScreen";
import SignUpScreen from "./src/Components/SignUpScreen";
import AuthLoadingScreen from "./src/Components/AuthLoadingScreen";

const AppStack = createBottomTabNavigator(
  {
    Map: MapScreen,
    Feed: FeedScreen,
<<<<<<< HEAD
    Camera: MapScreen,
    Profile: ProfileScreen,
=======
    Camera: CameraScreen,
    Profile: ProfileScreen
>>>>>>> 0b6a6a831321c20c208ca200effbad3f67208b77
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

<<<<<<< HEAD
const Foot = createAppContainer(BottomNav);

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

const App = () => {

  const [fontLoaded, setLoaded] = useState(false);
=======
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

// const App = () => {
//   const [fontLoaded, setLoaded] = useState(false);
>>>>>>> 0b6a6a831321c20c208ca200effbad3f67208b77

//   useEffect(() => {
//     loadFonts();
//   }, []);

<<<<<<< HEAD
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setLoaded(true);
  };
  return !fontLoaded ? <AppLoading /> : Main();
};
=======
//   const loadFonts = async () => {
//     await Font.loadAsync({
//       Roboto: require("native-base/Fonts/Roboto.ttf"),
//       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
//     });
//     setLoaded(true);
//   };
//   return !fontLoaded ? <AppLoading /> : <Main />;
// };
>>>>>>> 0b6a6a831321c20c208ca200effbad3f67208b77

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);