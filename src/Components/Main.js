import React, { useState, useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Header, Text } from "react-native";
import { AppLoading, SplashScreen } from "expo";

import Icon from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";
import mainStyle from '../../styles/main'

import MapScreen from "./MapScreen/MapScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import FeedScreen from "./FeedScreen/FeedScreen";
import CameraScreen from "./CameraScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import SplashLoadingScreen from "./SplashLoadingScreen";
import SecondSignUpScreen from "./SecondSignUpScreen";
import ModalArt from './ModalArt/ModalArt';

import { useApplicationData } from '../hooks/useApplicationData'

const createComponent = (instance, props) =>
  navProps => React.createElement(instance, Object.assign({}, props, navProps));


export default Main = ({navigation}) => {
  const {
    state,
    getUserLocation,
    getNearestArts,
    getNearestArt,
    setTag,
    userLogout,
    updateArts
  } = useApplicationData();

  const AppStack = createBottomTabNavigator(
    {
      Map: {
        screen: MapScreen
      },
      Feed: {
        screen: FeedScreen
      },
      Camera: {
        screen: CameraScreen
      },
      Profile: {
        screen: ProfileScreen
      }
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
        screen: ModalArt
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );

  return (
    <RootStack screenProps={state, getUserLocation, getNearestArt, getNearestArts, setTag} />
  )
}
