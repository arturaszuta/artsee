import React, { useState, useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Header } from "react-native";
import { AppLoading, SplashScreen } from "expo";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './src/reducers'

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
import ModalArt from './src/Components/ModalArt/ModalArt';

import useApplicationData from './src/hooks/useApplicationData';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

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

        return <IconComponent name={iconName} navigation={navigation} size={25} color={tintColor} />;
      },
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    tabBarOptions: {
      activeTintColor: "#39c2c9",
      inactiveTintColor: "#363a43",
      style: mainStyle.tabBar
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppStack,
    },
    ArtModal: {
      screen: ModalArt,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

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

let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
      Splash: SplashLoadingScreen,
      SecondSignup: SecondSignUpScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  ));

export default App = ({navigation}) => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
